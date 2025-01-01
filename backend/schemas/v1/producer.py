from pydantic import BaseModel
from typing import List

class ProducerBase(BaseModel):
    name: str

class ProducerCreate(ProducerBase):
    pass

class ProducerUpdate(ProducerBase):
    pass

class Producer(ProducerBase):
    id: int
    name: str

    class Config:
        from_attributes = True