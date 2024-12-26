from sqlalchemy import Column, Integer, ForeignKey, Table
from database.db import Base

anime_producers = Table('anime_producers', Base.metadata,
    Column('anime_id', Integer, ForeignKey('animevault.animes.id'), primary_key=True),
    Column('producer_id', Integer, ForeignKey('animevault.producers.id'), primary_key=True)
)