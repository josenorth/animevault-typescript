from pydantic import BaseModel
from typing import List, Optional
from datetime import date, datetime

class StaffSchema(BaseModel):
    id: Optional[int]
    name_full: Optional[str]
    name_native: Optional[str]
    languageV2: Optional[str]
    image: Optional[str]
    description: Optional[str]
    primaryOccupations: Optional[List[str]]
    gender: Optional[str]
    dateOfBirth: Optional[date]
    dateOfDeath: Optional[date]
    age: Optional[int]
    yearsActive: Optional[List[int]]  # Cambiado a lista de enteros
    homeTown: Optional[str]
    created_at: Optional[datetime]  # Cambiado a datetime
    updated_at: Optional[datetime]  # Cambiado a datetime

    class Config:
        from_attributes = True