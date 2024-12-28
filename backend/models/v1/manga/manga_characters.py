from sqlalchemy import Column, Integer, String, ForeignKey
from database.db import Base

class MangaCharacter(Base):
    __tablename__ = 'manga_characters'
    __table_args__ = {'schema': 'manga'}

    manga_id = Column(Integer, ForeignKey('manga.mangas.id'), primary_key=True, nullable=False)
    character_id = Column(Integer, ForeignKey('characters.characters.id'), primary_key=True, nullable=False)
    role = Column(String(50), nullable=True)