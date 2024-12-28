from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from database.db import Base
from ..shared.external_site import ExternalSite

class MangaExternalLink(Base):
    __tablename__ = 'external_links'
    __table_args__ = {'schema': 'manga'}

    id = Column(Integer, primary_key=True, index=True)
    manga_id = Column(Integer, ForeignKey('manga.mangas.id'), nullable=False)
    site_id = Column(Integer, ForeignKey('shared.external_sites.id'), nullable=False)
    url = Column(String, nullable=False)

    manga = relationship("Manga", back_populates="external_links")
    site = relationship(ExternalSite, back_populates="manga_external_links")