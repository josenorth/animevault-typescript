from sqlalchemy import Column, Integer, Float, TIMESTAMP, ForeignKey
from sqlalchemy.orm import relationship
from database.db import Base

class AnimeTrend(Base):
    __tablename__ = 'anime_trend'
    __table_args__ = {'schema': 'animevault'}

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    anime_id = Column(Integer, ForeignKey('animevault.animes.id'), nullable=False, unique=True)
    trending = Column(Integer, nullable=False)
    popularity = Column(Integer, default=0, nullable=True)
    average_score = Column(Float, default=0, nullable=True)
    created_at = Column(TIMESTAMP, nullable=True, server_default='CURRENT_TIMESTAMP')
    updated_at = Column(TIMESTAMP, nullable=True, server_default='CURRENT_TIMESTAMP', onupdate='CURRENT_TIMESTAMP')

    anime = relationship("Anime", back_populates="trends")