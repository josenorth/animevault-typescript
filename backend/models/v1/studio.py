from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database.db import Base
from models.v1.anime_studios import anime_studios

class Studio(Base):
    __tablename__ = 'studios'
    __table_args__ = {'schema': 'animevault'}

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)

    animes = relationship("Anime", secondary=anime_studios, back_populates="studios")