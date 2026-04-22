# TODO: Fix frontend to work with 412 error

from pydantic import BaseModel, Field, EmailStr, field_validator
from utils.utils import checkMail
from config.get_env import get_env

class AuthRegisterSchema(BaseModel):
    name: str = Field(min_length=1)
    username: str = Field(min_length=1)
    email: EmailStr = Field(min_length=1)
    password: str = Field(min_length=1)
    gender: str = Field(min_length=1)

    @field_validator("email")
    def check_email(cls, v):
        if not checkMail(v):
            raise ValueError("Email not valid")
        return v
    
    @field_validator("gender")
    def check_gender(cls, v):
        if v not in ["male", "female", "other"]:
            raise ValueError("Gender not allowed")
        return v
    
    @field_validator("password")
    def check_password(cls, v):
        if len(v) < get_env["PASS_LEN"]:
            raise ValueError("Password too weak")
        return v
    
class AuthLoginSchema(BaseModel):
    username: str = Field(min_length=1)
    password: str = Field(min_length=1)

    @field_validator("password")
    def check_password(cls, v):
        if len(v) < get_env["PASS_LEN"]:
            raise ValueError("Password too weak")
        return v