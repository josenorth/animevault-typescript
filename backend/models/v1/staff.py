from sqlalchemy import Column, Integer, String, Text, JSON, Date, TIMESTAMP, func
from sqlalchemy.orm import relationship
from database.db import Base

class Staff(Base):
    __tablename__ = 'staff'
    __table_args__ = {'schema': 'animevault'}

    id = Column(Integer, primary_key=True, autoincrement=True)
    name_full = Column(String(255), nullable=True)
    name_native = Column(String(255), nullable=True)
    languageV2 = Column(String(50), nullable=True)
    image = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)
    primaryOccupations = Column(JSON, nullable=True)
    gender = Column(String(50), nullable=True)
    dateOfBirth = Column(Date, nullable=True)
    dateOfDeath = Column(Date, nullable=True)
    age = Column(Integer, nullable=True)
    yearsActive = Column(JSON, nullable=True)
    homeTown = Column(String(255), nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.current_timestamp(), nullable=True)
    updated_at = Column(TIMESTAMP, server_default=func.current_timestamp(), onupdate=func.current_timestamp(), nullable=True)

    anime_characters = relationship("AnimeCharacter", back_populates="staff")