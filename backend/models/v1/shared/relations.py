from sqlalchemy import Column, Integer, Enum, TIMESTAMP, ForeignKey, func
from sqlalchemy.orm import relationship
from database.db import Base

class Relations(Base):
    __tablename__ = 'relations'
    __table_args__ = {'schema': 'shared'}

    id = Column(Integer, primary_key=True, autoincrement=True)
    anime_id = Column(Integer, ForeignKey('animevault.animes.id'), nullable=True)
    manga_id = Column(Integer, ForeignKey('manga.mangas.id'), nullable=True)
    related_anime_id = Column(Integer, ForeignKey('animevault.animes.id'), nullable=True)
    related_manga_id = Column(Integer, ForeignKey('manga.mangas.id'), nullable=True)
    relation_type = Column(Enum('ADAPTATION', 'PREQUEL', 'SEQUEL', 'PARENT', 'SIDE_STORY', 'CHARACTER', 'SUMMARY', 'ALTERNATIVE', 'SPIN_OFF', 'OTHER', 'SOURCE', 'COMPILATION', 'CONTAINS'), nullable=False)
    created_at = Column(TIMESTAMP, default=func.now())
    updated_at = Column(TIMESTAMP, default=func.now(), onupdate=func.now())

    # Relación entre Anime y Relations (especificando las claves foráneas)
    anime = relationship("Anime", foreign_keys=[anime_id], back_populates="relations")
    related_anime = relationship("Anime", foreign_keys=[related_anime_id], back_populates="related_relations")

    # Relación entre Manga y Relations (especificando las claves foráneas)
    manga = relationship("Manga", foreign_keys=[manga_id], back_populates="relations")
    related_manga = relationship("Manga", foreign_keys=[related_manga_id], back_populates="related_relations")