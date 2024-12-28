from sqlalchemy import Column, Integer, ForeignKey, TIMESTAMP, func
from database.db import Base 
from sqlalchemy.orm import relationship

class MangaTrend(Base):
    __tablename__ = 'manga_trends'
    __table_args__ = {'schema': 'manga'}

    manga_id = Column(Integer, ForeignKey('manga.mangas.id'), primary_key=True, nullable=False)
    popularity = Column(Integer, nullable=True)
    trending = Column(Integer, nullable=True)
    created_at = Column(TIMESTAMP, default=func.now(), nullable=True)
    update_at = Column(TIMESTAMP, default=func.now(), onupdate=func.now(), nullable=True)

    manga = relationship("Manga", back_populates="trends")