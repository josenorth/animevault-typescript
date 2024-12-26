from pydantic import BaseModel

class SeasonSchema(BaseModel):
    name: str

    class Config:
        orm_mode = True