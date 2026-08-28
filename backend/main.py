from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uuid
import time
import json
import groq
import os
from dotenv import load_dotenv

from database import engine, get_db
import models

load_dotenv()

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="SolveTogether AI - Backend API Scaffold")

# Configure CORS for local Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models ---

class ProblemCreate(BaseModel):
    description: str
    location: str
    category: str
    expected_impact: Optional[str] = None

class ProblemResponse(BaseModel):
    id: str
    description: str
    location: str
    category: str
    status: str
    priority_score: Optional[int] = None

class AIAnalysisRequest(BaseModel):
    problem_id: str
    description: Optional[str] = "Garbage collection is not happening regularly in our area."

class AIAnalysisResult(BaseModel):
    priority_score: int
    severity_level: str
    people_affected: int
    reasoning: str

class MatchResponse(BaseModel):
    university_matches: List[dict]
    industry_matches: List[dict]
    ngo_matches: List[dict]

class SolutionCreate(BaseModel):
    problem_id: str
    proposed_solution: str
    technology: List[str]

class ImpactMetrics(BaseModel):
    problems_reported: int
    solutions_scaled: int
    active_collaborations: int
    citizens_impacted: str

# --- Endpoints ---

@app.get("/")
def read_root():
    return {"message": "Welcome to SolveTogether AI Backend API"}

@app.post("/problems", response_model=ProblemResponse)
def create_problem(problem: ProblemCreate, db: Session = Depends(get_db)):
    """Submit a new problem."""
    db_problem = models.Problem(
        description=problem.description,
        location=problem.location,
        category=problem.category,
        expected_impact=problem.expected_impact
    )
    db.add(db_problem)
    db.commit()
    db.refresh(db_problem)
    return db_problem

@app.get("/problems", response_model=List[ProblemResponse])
def get_problems(db: Session = Depends(get_db)):
    """Get all problems from the database."""
    problems = db.query(models.Problem).all()
    return problems

@app.get("/problems/{problem_id}", response_model=ProblemResponse)
def get_problem(problem_id: str, db: Session = Depends(get_db)):
    """Get a single problem by ID."""
    db_problem = db.query(models.Problem).filter(models.Problem.id == problem_id).first()
    if not db_problem:
        raise HTTPException(status_code=404, detail="Problem not found")
    return db_problem

@app.post("/ai/analyze", response_model=AIAnalysisResult)
def analyze_problem(request: AIAnalysisRequest):
    """Simulate AI understanding and priority calculation using Groq."""
    try:
        api_key = os.getenv("GROQ_API_KEY")
        client = groq.Groq(api_key=api_key)
        
        prompt = f"""
        Analyze this civic problem: '{request.description}'.
        Calculate a realistic priority score (integer from 1 to 100) based on how critical it is (higher score for safety hazards, blocked traffic, health risks, and clean water leaks).
        
        CRITICAL: Do not default to 85. Estimate the actual severity, count of people affected, and write a specific reason why.
        
        Return ONLY a raw JSON object with no markdown formatting:
        {{
          "priority_score": [calculated score between 1 and 100],
          "severity_level": "[Low/Medium/High/Critical]",
          "people_affected": [estimate integer of citizens impacted],
          "reasoning": "[specific detailed explanation of priority calculation]"
        }}
        """
        
        response = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="groq/compound-mini",
            temperature=0.3,
        )
        
        content = response.choices[0].message.content.strip()
        if content.startswith("```json"):
            content = content[7:-3]
        elif content.startswith("```"):
            content = content[3:-3]
            
        ai_data = json.loads(content)
        
        return AIAnalysisResult(
            priority_score=int(ai_data.get("priority_score", 92)),
            severity_level=str(ai_data.get("severity_level", "High")),
            people_affected=int(ai_data.get("people_affected", 1250)),
            reasoning=str(ai_data.get("reasoning", "AI analyzed this issue."))
        )
    except Exception as e:
        print(f"AI Error: {e}")
        time.sleep(1) 
        return AIAnalysisResult(
            priority_score=92,
            severity_level="High",
            people_affected=1250,
            reasoning="Fallback: Affects dense residential area with repeated complaints, creating health risks."
        )

@app.post("/ai/match", response_model=MatchResponse)
def match_collaborators(request: AIAnalysisRequest):
    """Generate dynamic AI matching using Groq based on problem description."""
    try:
        api_key = os.getenv("GROQ_API_KEY")
        client = groq.Groq(api_key=api_key)
        
        prompt = f"""
        Analyze the following civic problem: '{request.description}'.
        Generate a list of potential collaborators from University, Industry, and NGO sectors who can help solve THIS SPECIFIC problem.
        You must return exactly:
        - 2 University Match entities
        - 2 Industry Match entities
        - 1 NGO & Community Match entity
        
        CRITICAL REQUIREMENT:
        - The 'pastProject' and 'howTheyDidIt' for each collaborator MUST be a highly specific, realistic project directly related to solving the USER'S reported problem ('{request.description}'). 
        - For example, if it's a water pipeline leak, they must have solved water pipeline leakage or smart water distribution issues in the past. If it's streetlights, they must have solved streetlight repair/IoT monitoring.
        - Explain CLEARLY what technology was used, what they solved, and the step-by-step method they used to solve it. Avoid generic answers like "solved water scarcity" for a pipeline leak.
        
        For each collaborator, provide:
        - name: A realistic name of the department/company/group.
        - score: A match percentage score (integer between 50 and 100).
        - reason: A brief reason why they match.
        - pastProject: A detailed description of a SIMILAR problem they solved in the past.
        - howTheyDidIt: A clear, step-by-step explanation of how they executed and solved that past project.

        Return ONLY a raw JSON object with no markdown formatting:
        {{
          "university_matches": [
            {{"name": "...", "score": 95, "reason": "...", "pastProject": "...", "howTheyDidIt": "..."}},
            {{"name": "...", "score": 91, "reason": "...", "pastProject": "...", "howTheyDidIt": "..."}}
          ],
          "industry_matches": [
            {{"name": "...", "score": 88, "reason": "...", "pastProject": "...", "howTheyDidIt": "..."}},
            {{"name": "...", "score": 82, "reason": "...", "pastProject": "...", "howTheyDidIt": "..."}}
          ],
          "ngo_matches": [
            {{"name": "...", "score": 94, "reason": "...", "pastProject": "...", "howTheyDidIt": "..."}}
          ]
        }}
        """
        
        response = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="groq/compound-mini",
            temperature=0.3,
        )
        
        content = response.choices[0].message.content.strip()
        if content.startswith("```json"):
            content = content[7:-3]
        elif content.startswith("```"):
            content = content[3:-3]
            
        match_data = json.loads(content)
        return MatchResponse(
            university_matches=match_data.get("university_matches", []),
            industry_matches=match_data.get("industry_matches", []),
            ngo_matches=match_data.get("ngo_matches", [])
        )
    except Exception as e:
        print(f"AI Match Error: {e}")
        # Fallback to defaults
        return MatchResponse(
            university_matches=[
                {"name": "Environmental Engineering Dept", "score": 96, "reason": "Specialized in urban waste management.", "pastProject": "City-wide composting initiative.", "howTheyDidIt": "Deployed automated compost bins."},
                {"name": "AI & Data Science Lab", "score": 91, "reason": "Can build predictive models for garbage generation.", "pastProject": "Predictive traffic management.", "howTheyDidIt": "Analyzed 5 years of traffic data."}
            ],
            industry_matches=[
                {"name": "EcoTech IoT Solutions", "score": 89, "reason": "Provides smart bin sensors.", "pastProject": "Smart water meter deployment.", "howTheyDidIt": "Installed 10,000 smart meters."}
            ],
            ngo_matches=[
                {"name": "Clean City Initiative", "score": 94, "reason": "Active in the affected geographic area.", "pastProject": "Lake restoration project.", "howTheyDidIt": "Mobilized 2,000 volunteers."}
            ]
        )

@app.post("/solutions")
def create_solution(solution: SolutionCreate, db: Session = Depends(get_db)):
    """Propose a solution for a specific problem."""
    db_solution = models.Solution(
        problem_id=solution.problem_id,
        proposed_solution=solution.proposed_solution,
        technology=",".join(solution.technology)
    )
    db.add(db_solution)
    db.commit()
    db.refresh(db_solution)
    return {"message": "Solution proposed successfully", "solution_id": db_solution.id}

@app.get("/impact", response_model=ImpactMetrics)
def get_impact_metrics():
    """Get global platform impact metrics."""
    return ImpactMetrics(
        problems_reported=2450,
        solutions_scaled=850,
        active_collaborations=1200,
        citizens_impacted="2.4M"
    )

@app.get("/organizations")
def get_organizations():
    """Get registered organizations (universities, industry, NGOs, etc)."""
    return {"message": "List of organizations"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
