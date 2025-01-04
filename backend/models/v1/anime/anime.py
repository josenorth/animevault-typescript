from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey, Enum, func
from sqlalchemy.orm import relationship
from ..shared.genre import Genre
from .season import Season
from .studio import Studio
from .anime_trend import AnimeTrend
from .anime_genres import anime_genres
from .anime_studios import anime_studios
from .anime_trailer import AnimeTrailer
from .external_link import AnimeExternalLink
from .anime_character import AnimeCharacter
from .streaming_link import StreamingLink
from ..shared.relations import Relations
from .anime_news import AnimeNews
from database.db import Base

class Anime(Base):
    __tablename__ = 'animes'
    __table_args__ = {'schema': 'animevault'}

    id = Column(Integer, primary_key=True, index=True)
    id_mal = Column(Integer, nullable=True)
    title_romaji = Column(String, nullable=False)
    title_english = Column(String, nullable=True)
    native = Column(String, nullable=True)
    description = Column(String, nullable=True)
    coverImage = Column(String, nullable=True)
    bannerImage = Column(String, nullable=True)
    episode_count = Column(Integer, nullable=True)
    episode_duration = Column(Integer, nullable=True)
    average_score = Column(Float, default=0, nullable=True)
    popularity = Column(Integer, default=0, nullable=True)
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)
    seasonYear = Column(Integer, nullable=True)
    format = Column(Enum('TV', 'TV_SHORT', 'MOVIE', 'SPECIAL', 'OVA', 'ONA', 'MUSIC', 'MANGA', 'NOVEL', 'ONE_SHOT'), nullable=True)
    season_id = Column(Integer, ForeignKey('animevault.seasons.id'), nullable=True)  # Cambio aquí: season a season_id
    status = Column(Enum('FINISHED', 'RELEASING', 'NOT_YET_RELEASED', 'CANCELLED', 'HIATUS'), nullable=True)
    source = Column(Enum('ORIGINAL', 'MANGA', 'LIGHT_NOVEL', 'VISUAL_NOVEL', 'VIDEO_GAME', 'OTHER', 'NOVEL', 'DOUJINSHI', 'ANIME', 'WEB_NOVEL', 'LIVE_ACTION', 'GAME', 'COMIC', 'MULTIMEDIA_PROJECT', 'PICTURE_BOOK'), nullable=True)
    isAdult = Column(Integer, default=0, nullable=True)
    created_at = Column(Date, nullable=True, default=func.now())
    updated_at = Column(Date, nullable=True, default=func.now(), onupdate=func.now() )

    season = relationship(Season, back_populates="animes")  # Relación con Season
    genres = relationship(Genre, secondary="animevault.anime_genres", back_populates="animes")
    trends = relationship(AnimeTrend, back_populates="anime")
    studios = relationship(Studio, secondary=anime_studios, back_populates="animes")
    trailers = relationship(AnimeTrailer, back_populates="anime")
    external_links = relationship(AnimeExternalLink, back_populates="anime")
    anime_characters = relationship(AnimeCharacter, back_populates="anime")  # Añadir esta línea
    streaming_links = relationship(StreamingLink, back_populates="anime", cascade="all, delete-orphan")
    
    relations = relationship(Relations, foreign_keys=[Relations.anime_id], back_populates="anime")
    related_relations = relationship(Relations, foreign_keys=[Relations.related_anime_id], back_populates="related_anime")
    news = relationship(AnimeNews, back_populates="anime", cascade="all, delete-orphan")