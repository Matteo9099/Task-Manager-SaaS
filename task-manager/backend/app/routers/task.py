from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.database.deps import get_db
from app.models.task import Task

from app.schemas.task import (
    TaskCreate,
    TaskResponse,
)

router = APIRouter(
    prefix="/tasks",
    tags=["tasks"]
)

# CREATE Task
@router.post(
    "",
    response_model=TaskResponse
)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    new_task = Task(
        title=task.title,
        description=task.description,
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

# GET all Task
@router.get(
    "", 
    response_model=list[TaskResponse]
)
def get_tasks(
    db: Session = Depends(get_db)
):

    tasks = db.query(Task).all()

    return tasks


# GET single Task
@router.get(
        "/{task_id}", 
        response_model=TaskResponse
)
def get_task(
    task_id: int,
    db: Session = Depends(get_db)
):
    
    task = (
        db.query(Task)
        .filter(Task.id == task_id)
        .first()
    )
    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )
    return task


# UPDATE Task
@router.put(
        "/{task_id}", 
        response_model=TaskResponse
)
def update_task(
    task_id: int,
    updated_task: TaskCreate,
    db: Session = Depends(get_db)
):

    task = (
        db.query(Task)
        .filter(Task.id == task_id)
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    task.title = updated_task.title
    task.description = updated_task.description

    db.commit()
    db.refresh(task)

    return task


# Toggle completed
@router.patch(
    "/{task_id}/toggle",
    response_model=TaskResponse
)
def toggle_task(
    task_id: int,
    db: Session = Depends(get_db)
):

    task = (
        db.query(Task)
        .filter(Task.id == task_id)
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    task.completed = not task.completed

    db.commit()
    db.refresh(task)

    return task

# DELETE Task
@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db)
):

    task = (
        db.query(Task)
        .filter(Task.id == task_id)
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    db.delete(task)
    db.commit()

    return {
        "message": "Task deleted"
    }