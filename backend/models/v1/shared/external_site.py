from sqlalchemy import Column, Integer, String, Text, Boolean
from sqlalchemy.orm import relationship
from database.db import Base

class ExternalSite(Base):
    __tablename__ = 'external_sites'
    __table_args__ = {'schema': 'shared'}

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    color = Column(String(7), nullable=True)    
    icon = Column(String(255), nullable=True)   
    type = Column(String(50), nullable=True)    
    language = Column(String(50), nullable=True)  
    notes = Column(Text, nullable=True)
    isDisabled = Column(Boolean, default=False)

    external_links = relationship("MangaExternalLink", back_populates="site")
