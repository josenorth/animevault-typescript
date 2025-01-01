from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database.db import Base

class MangaTrailer(Base):
    __tablename__ = 'manga_trailers'  # Corregir nombre de tabla
    __table_args__ = {'schema': 'manga'}

    id = Column(Integer, primary_key=True, index=True)
    manga_id = Column(Integer, ForeignKey('manga.mangas.id'), nullable=False)
    trailer_id = Column(String, nullable=False)
    site = Column(String, nullable=False)
    thumbnail = Column(String, nullable=True)

    manga = relationship("Manga", back_populates="trailers")