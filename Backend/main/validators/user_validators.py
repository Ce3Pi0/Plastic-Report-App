from pydantic import BaseModel, Field, EmailStr, field_validator
from utils.utils import checkMail
from config.get_env import get_env
from validators.auth_validators import AuthRegisterSchema
class UserCreateSchema(AuthRegisterSchema):
    current_username: str = Field(min_length=1)
    current_password: str = Field(min_length=1)
    type: str = Field(min_length=1, default="client")

    @field_validator("current_password")
    def check_current_password(cls, v):
        if len(v) < (get_env.get("PASS_LEN") or 6):
            raise ValueError("Password too weak")
        return v

    @field_validator("type")
    def check_type(cls, v):
        __valid_types = ["client, admin"]
        if v not in __valid_types:
            raise ValueError("Invalid user type")
        return v

class UserUpdateSchema(BaseModel):
    username: str = Field(min_length=1)
    password: str = Field(min_length=1)
    new_password: str = Field(min_length=1)

    @field_validator("new_password")
    def check_new_password(cls, v):
        if len(v) < (get_env.get("PASS_LEN") or 6):
            raise ValueError("Password too weak")
        return v