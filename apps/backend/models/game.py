from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from core.database import Base

class Game(Base):
    __tablename__ = "games"

    id = Column(Integer, primary_key=True, index=True)
    pgn = Column(String)
    fen = Column(String)
    status = Column(String)  # ongoing, finished, resigned
    result = Column(String, nullable=True) # 1-0, 0-1, 1/2-1/2
    
    white_player_id = Column(Integer, ForeignKey("users.id"))
    black_player_id = Column(Integer, ForeignKey("users.id"), nullable=True) # Null if playing AI
    
    created_at = Column(DateTime, default=datetime.utcnow)
    finished_at = Column(DateTime, nullable=True)

    white_player = relationship("User", foreign_keys=[white_player_id])
    black_player = relationship("User", foreign_keys=[black_player_id])
