from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import engine
from app.database.base import Base

from app.models.task import Task

from app.routers.task import router as task_router
from app.models.user import User
from app.routers.auth import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(auth_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(task_router)


@app.get("/")
def root():
    return {
        "message": "Task Manager API"
    }