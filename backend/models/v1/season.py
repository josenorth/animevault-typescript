from sqlalchemy import Column, Integer, String, Enum
from sqlalchemy.orm import relationship
from database.db import Base

class Season(Base):
    __tablename__ = 'seasons'
    __table_args__ = {'schema': 'animevault'}

    id = Column(Integer, primary_key=True, index=True)
    name = Column(Enum('WINTER', 'SUMMER', 'FALL', 'SPRING'), nullable=False)  # Usar Enum para las estaciones

    animes = relationship("Anime", back_populates="season")
