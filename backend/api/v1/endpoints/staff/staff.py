from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database.db import get_db
from models.v1.staff import Staff
from schemas.v1.staff import StaffSchema

router = APIRouter()

@router.get("/{staff_id}", response_model=StaffSchema)
def get_staff_by_id(staff_id: int, db: Session = Depends(get_db)):
    staff = db.query(Staff).filter(Staff.id == staff_id).first()
    if not staff:
        raise HTTPException(status_code=404, detail="Staff not found")
    return staff

