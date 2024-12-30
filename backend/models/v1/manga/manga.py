from sqlalchemy import Column, Integer, String, Text, Enum,SmallInteger
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from database.db import Base
from .manga_genres import manga_genres
from .manga_trend import MangaTrend
from .manga_trailer import MangaTrailer
from .external_link import MangaExternalLink
from ..shared.genre import Genre
from ..shared.relations import Relations


class Manga(Base):
    __tablename__ = 'mangas'
    __table_args__ = {'schema': 'manga'}

    id = Column(Integer, primary_key=True, nullable=False)
    title_romaji = Column(String(255), nullable=True)
    title_english = Column(String(255), nullable=True)
    title_native = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)
    status = Column(Enum('FINISHED', 'RELEASING', 'NOT_YET_RELEASED', 'CANCELLED', 'HIATUS'), nullable=True)
    format = Column(String(50), nullable=True)
    countryOfOrigin = Column(String(50), nullable=True)
    source = Column(Enum('ORIGINAL', 'MANGA', 'LIGHT_NOVEL', 'VISUAL_NOVEL', 'VIDEO_GAME', 'OTHER', 'NOVEL', 'DOUJINSHI', 'ANIME', 'WEB_NOVEL', 'LIVE_ACTION', 'GAME', 'COMIC', 'MULTIMEDIA_PROJECT', 'PICTURE_BOOK'), nullable=True)
    averageScore = Column(Integer, nullable=True)
    chapters = Column(Integer, nullable=True)
    volumes = Column(Integer, nullable=True)
    startDate = Column(Integer, nullable=True)
    endDate = Column(Integer, nullable=True)
    coverImage = Column(String(255), nullable=True)
    bannerImage = Column(String(255), nullable=True)
    isAdult = Column(SmallInteger, default=0, nullable=True)

    trends = relationship(MangaTrend, back_populates="manga")
    trailers = relationship(MangaTrailer, back_populates="manga")
    external_links = relationship(MangaExternalLink, back_populates="manga")
    genres = relationship(Genre, secondary=manga_genres, back_populates="mangas")
   
    relations = relationship(Relations, foreign_keys=[Relations.manga_id], back_populates="manga")
    related_relations = relationship(Relations, foreign_keys=[Relations.related_manga_id], back_populates="related_manga")