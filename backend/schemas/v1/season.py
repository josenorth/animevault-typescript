from pydantic import BaseModel

class SeasonSchema(BaseModel):
    name: str

    class Config:
        from_attributes = True