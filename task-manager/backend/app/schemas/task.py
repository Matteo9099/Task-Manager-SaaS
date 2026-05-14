

from pydantic import BaseModel

# CREARE TASK 
class TaskCreate(BaseModel):
    title: str
    description: str

# RISPOSTA API
class TaskResponse(BaseModel):
    id: int
    title: str
    description: str
    completed: bool

    class Config:
        from_attributes = True