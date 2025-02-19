from pydantic import BaseModel

class GenreSchema(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True