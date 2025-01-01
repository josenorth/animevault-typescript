from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database.db import Base

class Genre(Base):
    __tablename__ = 'genres'
    __table_args__ = {'schema': 'shared'}
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    animes = relationship("models.v1.anime.anime.Anime", secondary="animevault.anime_genres", back_populates="genres")
    mangas = relationship("models.v1.manga.manga.Manga", secondary="manga.manga_genres", back_populates="genres")

    def __repr__(self):
        return f"<Genre(id={self.id}, name='{self.name}')>"