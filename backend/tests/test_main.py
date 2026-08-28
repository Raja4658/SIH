import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from fastapi.testclient import TestClient
from main import app
from database import Base, engine, get_db
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Setup a test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test_sql_app.db"
engine_test = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine_test)

Base.metadata.create_all(bind=engine_test)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to SolveTogether AI Backend API"}

def test_create_problem():
    response = client.post(
        "/problems",
        json={
            "description": "Potholes on Main Street",
            "location": "Chennai",
            "category": "Infrastructure",
            "expected_impact": "Improve road safety"
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["description"] == "Potholes on Main Street"
    assert data["location"] == "Chennai"
    assert "id" in data

def test_get_problems():
    response = client.get("/problems")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_solution():
    # First, get a problem or create one
    prob_res = client.post(
        "/problems",
        json={"description": "Test", "location": "Test", "category": "Test"}
    )
    problem_id = prob_res.json()["id"]

    response = client.post(
        "/solutions",
        json={
            "problem_id": problem_id,
            "proposed_solution": "Fill them up",
            "technology": ["Concrete"]
        }
    )
    assert response.status_code == 200
    assert response.json()["message"] == "Solution proposed successfully"
