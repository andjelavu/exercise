from typing import Union, Optional
from fastapi import FastAPI, HTTPException
from users import _users, update_user
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserUpdate(BaseModel):
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/users")
def read_users():
    return _users

@app.put("/users/{user_id}")
def edit_user(user_id: int, user_data: UserUpdate):
    data = user_data.dict(exclude_unset=True)
    updated_user = update_user(user_id, data)

    if updated_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user
