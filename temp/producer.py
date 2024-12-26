from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database.db import Base
from models.v1.anime_producer import anime_producers

class Producer(Base):
    __tablename__ = 'producers'
    __table_args__ = {'schema': 'animevault'}

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False, unique=True)

    animes = relationship("Anime", secondary=anime_producers, back_populates="producers")