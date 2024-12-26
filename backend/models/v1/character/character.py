from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, Date
from sqlalchemy.orm import relationship
from database.db import Base
from sqlalchemy.sql import func

class Character(Base):
    __tablename__ = 'characters'
    __table_args__ = {'schema': 'characters'}

    id = Column(Integer, primary_key=True, autoincrement=True)
    name_full = Column(String(255), nullable=False)
    name_native = Column(String(255), nullable=True)
    age = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)
    dateOfBirth = Column(Date, nullable=True)
    image = Column(String(255), nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now(), nullable=True)
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now(), nullable=True)

    anime_characters = relationship("AnimeCharacter", back_populates="character")