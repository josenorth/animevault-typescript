from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database.db import Base

class AnimeExternalSite(Base):
    __tablename__ = 'external_sites'
    __table_args__ = {'schema': 'animevault'}

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    color = Column(String, nullable=True)
    icon = Column(String, nullable=True)

    external_links = relationship("ExternalLink", back_populates="site")