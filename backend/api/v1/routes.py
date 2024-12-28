from fastapi import APIRouter
from api.v1.endpoints import animes
from api.v1.endpoints.staff import staff
from api.v1.endpoints.manga import mangas 

router = APIRouter()

router.include_router(animes.router, prefix="/animes", tags=["animes"])
router.include_router(staff.router, prefix="/staff", tags=["staff"])
router.include_router(mangas.router, prefix="/mangas", tags=["mangas"])