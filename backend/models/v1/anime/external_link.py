from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from database.db import Base

class ExternalLink(Base):
    __tablename__ = 'external_links'
    __table_args__ = {'schema': 'animevault'}

    id = Column(Integer, primary_key=True, index=True)
    anime_id = Column(Integer, ForeignKey('animevault.animes.id'), nullable=False)
    site_id = Column(Integer, ForeignKey('animevault.external_sites.id'), nullable=False)
    url = Column(String, nullable=False)

    anime = relationship("Anime", back_populates="external_links")
    site = relationship("AnimeExternalSite", back_populates="external_links")