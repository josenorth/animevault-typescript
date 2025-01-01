from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP, func
from sqlalchemy.orm import relationship
from database.db import Base

class StreamingLink(Base):
    __tablename__ = 'streaming_links'
    __table_args__ = {'schema': 'animevault'}

    id = Column(Integer, primary_key=True, autoincrement=True)
    anime_id = Column(Integer, ForeignKey('animevault.animes.id', ondelete='CASCADE'), nullable=False)
    title = Column(String, nullable=False)
    thumbnail = Column(String, nullable=False)
    url = Column(String, nullable=False)
    site = Column(String, nullable=False)
    created_at = Column(TIMESTAMP, default=func.now(), nullable=False)
    updated_at = Column(TIMESTAMP, default=func.now(), onupdate=func.now(), nullable=False)

    # Relación con Anime
    anime = relationship("Anime", back_populates="streaming_links")
