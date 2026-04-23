from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from groq import Groq
from openai import AzureOpenAI
import os
from typing import List, Optional

router = APIRouter(prefix="/ai", tags=["AI"])

def get_groq_client():
    try:
        return Groq(api_key=os.getenv("GROQ_API_KEY"))
    except Exception:
        return None

def get_azure_client():
    try:
        return AzureOpenAI(
            api_key=os.getenv("AZURE_OPENAI_API_KEY"),
            api_version="2024-02-15-preview",
            azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT")
        )
    except Exception:
        return None

class MoveHintRequest(BaseModel):
    fen: str
    history: List[str]

@router.post("/hint")
async def get_move_hint(request: MoveHintRequest):
    """
    Get a fast tactical hint using Groq + Llama 3
    """
    client = get_groq_client()
    if not client:
        # High-quality mock response for demo
        import random
        mocks = [
            "Your position is solid. Focus on controlling the center with your minor pieces.",
            "Look for tactical opportunities on the kingside. The opponent's king safety is slightly compromised.",
            "The pawn structure suggests a closed game. Consider maneuvering your knights to better outposts.",
            "You have a slight space advantage. Try to restrict your opponent's piece activity.",
            "The position is equal. Be careful of potential back-rank weaknesses."
        ]
        return {"hint": f"[MOCK] {random.choice(mocks)}"}
    
    try:
        completion = client.chat.completions.create(
            model="llama3-70b-8192",
            messages=[
                {"role": "system", "content": "You are a Grandmaster chess coach. Provide a very brief, high-level tactical hint for the current position given as FEN. Do not give the exact move, just the strategic goal."},
                {"role": "user", "content": f"Current FEN: {request.fen}\nMove History: {', '.join(request.history)}"}
            ],
            temperature=0.7,
            max_tokens=100
        )
        return {"hint": completion.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class AnalysisRequest(BaseModel):
    pgn: str

@router.post("/analyze")
async def analyze_game(request: AnalysisRequest):
    """
    Get deep post-game analysis using Azure OpenAI
    """
    client = get_azure_client()
    if not client:
        return {"analysis": "AI Analysis service is currently unavailable. Please check your API keys."}

    try:
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are an elite chess analyst. Analyze the following PGN game. Identify critical moments, blunders, and brilliancies. Provide alternative lines for mistakes and a summary of the player's performance."},
                {"role": "user", "content": f"Game PGN: {request.pgn}"}
            ]
        )
        return {"analysis": completion.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
