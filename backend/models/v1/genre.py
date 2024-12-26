from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database.db import Base

class Genre(Base):
    __tablename__ = 'genres'
    __table_args__ = {'schema': 'animevault'}
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    animes = relationship("Anime", secondary="anime_genres", back_populates="genres")

    def __repr__(self):
        return f"<Genre(id={self.id}, name='{self.name}')>"