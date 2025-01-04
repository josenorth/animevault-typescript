from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, func
from sqlalchemy.orm import relationship
from database.db import Base

class AnimeNews(Base):
    __tablename__ = 'anime_news'
    __table_args__ = {'schema': 'animevault'}

    id = Column(Integer, primary_key=True, autoincrement=True)
    anime_id = Column(Integer, ForeignKey('animevault.animes.id_mal'), nullable=False)
    mal_news_id = Column(Integer, nullable=False)
    url = Column(String(255), nullable=False)
    title = Column(String(255), nullable=False)
    date = Column(DateTime, nullable=False)
    author_username = Column(String(255), nullable=True)
    author_url = Column(String(255), nullable=True)
    forum_url = Column(String(255), nullable=True)
    image_url = Column(String(255), nullable=True)
    comments = Column(Integer, default=0, nullable=True)
    excerpt = Column(Text, nullable=True)
    created_at = Column(DateTime, default=func.now(), nullable=True)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=True)

    anime = relationship("Anime", back_populates="news")