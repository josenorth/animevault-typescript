from pydantic import BaseModel



class StudioSchema(BaseModel):
    id: int
    name: str
    isMain: bool

    class Config:
        from_attributes = True