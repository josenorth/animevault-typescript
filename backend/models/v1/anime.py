from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey, Enum
from sqlalchemy.orm import relationship
from models.v1.genre import Genre
from models.v1.season import Season
from models.v1.studio import Studio
from models.v1.anime_trend import AnimeTrend
from models.v1.anime_genres import anime_genres
from models.v1.anime_studios import anime_studios
from database.db import Base

class Anime(Base):
    __tablename__ = 'animes'
    __table_args__ = {'schema': 'animevault'}

    id = Column(Integer, primary_key=True, index=True)
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

    season = relationship(Season, back_populates="animes")  # Relación con Season
    genres = relationship(Genre, secondary=anime_genres, back_populates="animes")
    trends = relationship(AnimeTrend, back_populates="anime")
    studios = relationship(Studio, secondary=anime_studios, back_populates="animes")