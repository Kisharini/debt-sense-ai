from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from spending_classifier import classify_transaction

app = FastAPI()

class Transaction(BaseModel):
    description: str
    amount: float

origins = [
    "http://localhost:8081",
    "http://localhost:19006",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserData(BaseModel):
    income: float
    spending: float
    bnpl_count: int
    late_payments: int


@app.post("/risk-score")
def calculate_risk(data: UserData):

    spending_ratio = data.spending / data.income
    risk_score = int(spending_ratio * 60 + data.bnpl_count * 5)

    insight = ""

    if data.bnpl_count > 3:
        insight = "Your PayLater spending increased significantly."
    elif spending_ratio > 0.8:
        insight = "You are spending most of your income."

    return {
        "risk_score": risk_score,
        "insight": insight
    }
    
@app.post("/classify-spending")
def classify(data: Transaction):
    category = classify_transaction(data.description)
    
    return {
        "category": category,
        "amount": data.amount
    }
