from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from database.db import Base
from ..shared.external_site import ExternalSite

class AnimeExternalLink(Base):
    __tablename__ = 'external_links'
    __table_args__ = {'schema': 'animevault'}

    id = Column(Integer, primary_key=True, index=True)
    anime_id = Column(Integer, ForeignKey('animevault.animes.id'), nullable=False)
    site_id = Column(Integer, ForeignKey('shared.external_sites.id'), nullable=False)
    url = Column(String, nullable=False)

    anime = relationship("Anime", back_populates="external_links")
    site = relationship(ExternalSite, back_populates="anime_external_links")