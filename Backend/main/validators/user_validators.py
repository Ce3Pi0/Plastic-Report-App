from pydantic import BaseModel, Field, EmailStr, field_validator
from utils.utils import checkMail
from config.get_env import get_env

class AuthRegisterSchema(BaseModel):
    pass