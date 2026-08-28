from sqlalchemy import Column, Integer, String
from database import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class Problem(Base):
    __tablename__ = "problems"

    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    description = Column(String, index=True)
    location = Column(String, index=True)
    category = Column(String, index=True)
    status = Column(String, default="Submitted")
    priority_score = Column(Integer, nullable=True)
    expected_impact = Column(String, nullable=True)

class Solution(Base):
    __tablename__ = "solutions"
    
    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    problem_id = Column(String, index=True)
    proposed_solution = Column(String)
    technology = Column(String) # Will store as JSON string or comma separated for simplicity

