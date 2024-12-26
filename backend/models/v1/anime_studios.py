from sqlalchemy import Column, Integer, ForeignKey, Table, Boolean
from database.db import Base

anime_studios = Table('anime_studios', Base.metadata,
    Column('anime_id', Integer, ForeignKey('animevault.animes.id'), primary_key=True),
    Column('studio_id', Integer, ForeignKey('animevault.studios.id'), primary_key=True),
    Column('isMain', Boolean, nullable=False, default=0, primary_key=True)
)