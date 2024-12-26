from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship
from database.db import Base

class AnimeCharacter(Base):
    __tablename__ = 'anime_characters'
    __table_args__ = {'schema': 'animevault'}

    anime_id = Column(Integer, ForeignKey('animevault.animes.id'), primary_key=True, nullable=False)
    character_id = Column(Integer, ForeignKey('characters.characters.id'), primary_key=True, nullable=False)
    staff_id = Column(Integer, ForeignKey('animevault.staff.id'), primary_key=True, nullable=False)
    role = Column(String(50), nullable=True)
    languageV2 = Column(String(50), nullable=True)

    staff = relationship("Staff", back_populates="anime_characters")
    character = relationship("Character", back_populates="anime_characters")