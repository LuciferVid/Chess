import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from core.socket_manager import socket_app
from routers.ai_router import router as ai_router
from routers.auth_router import router as auth_router
from core.database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Chess Platform API",
    description="Production-grade, AI-powered chess platform backend",
    version="1.0.0"
)

# Include routers
app.include_router(auth_router)
app.include_router(ai_router)

# Mount Socket.IO app
app.mount("/ws", socket_app)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "status": "online",
        "message": "Chess Platform API is running",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
