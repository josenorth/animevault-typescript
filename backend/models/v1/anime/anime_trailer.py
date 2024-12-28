from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database.db import Base

class AnimeTrailer(Base):
    __tablename__ = 'anime_trailers'
    __table_args__ = {'schema': 'animevault'}

    id = Column(Integer, primary_key=True, index=True)
    anime_id = Column(Integer, ForeignKey('animevault.animes.id'), nullable=False)
    trailer_id = Column(String, nullable=False)
    site = Column(String, nullable=False)
    thumbnail = Column(String, nullable=True)

    anime = relationship("Anime", back_populates="trailers")  # Relación con Anime