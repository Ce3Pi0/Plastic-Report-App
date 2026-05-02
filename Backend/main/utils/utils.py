import uuid
import codecs
import random
import bcrypt
import re
from datetime import datetime, timedelta
from flask import Request
from itsdangerous import SignatureExpired, BadSignature, BadTimeSignature
from config.config import s
from config.get_env import get_env
from utils.httpAbort import abort
from config.errorCodes import HttpError
from controllers.base_controller import BaseController
from typing import Type

def createRequest(request: Request, controller: Type[BaseController]):
    method = request.method

    CRUD = {
        "POST": lambda: controller.create(request),
        "GET": lambda: controller.read(request),
        "PUT": lambda: controller.update(request),
        "DELETE": lambda: controller.delete(request),
    }

    if method not in CRUD:
        abort(HttpError.METHOD_NOT_ALLOWED)

    return CRUD[method]()

def genSalt() -> bytes:
    return bcrypt.gensalt()

def hashPassword(password: str, salt: bytes) -> bytes:
    encoded_pass = password.encode("utf-8")
    if isinstance(salt, str):
        salt = salt.encode("utf-8")
    
    return bcrypt.hashpw(encoded_pass, salt)
    
def get_random_alphanumerical(_len = 16):
    asciiCodes = []
    alphanumerical = ""
    asciiCodes += random.sample(range(97, 122), int(round(0.375 * _len)))
    asciiCodes += random.sample(range(65, 90), int(round(0.375 * _len)))
    asciiCodes += random.sample(range(48, 57), int(round(0.25 * _len)))
    random.shuffle(asciiCodes)
    for char in asciiCodes:
        alphanumerical += chr(char)
    return alphanumerical

def checkMail(email) -> bool:
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    if re.fullmatch(regex, email):
        return True
    return False


    
def decode_postgres_bytea(value) -> bytes | None:
    if isinstance(value, str) and value.startswith("\\x"):
        return codecs.decode(value[2:], "hex")
    return None

def validate_privilege(user_type) -> bool:
    __privilege = {"client":1, "admin":2}
    if __privilege[user_type] < __privilege["admin"]:
        return False
    return True

def validate_boolean_str(bool_val: str) -> bool:
    bool_val = bool_val.upper()
    if bool_val != "TRUE" and bool_val != "FALSE":
        return False
    return True

def boolean_str_to_boolean(bool_val: str) -> bool:
    if validate_boolean_str(bool_val):
        return bool_val == "TRUE"
    raise ValueError("Invalid value provided")

def validate_report_status(status: str) -> bool:
    __statuses = ["pending", "completed", "rejected"]
    return status in __statuses

def validate_request_type(req_type: str) -> bool:
    __types = ["password_request", "email_request"]
    return req_type in __types

def check_last_request_time(current_request):
    if get_env.get("ENV") == "DEVELOPMENT":
        return

    if current_request.time is not None:
            if datetime.now() - datetime.strptime(current_request.time, '%Y-%m-%d %H:%M:%S.%f') > timedelta(minutes=int(get_env.get("REQUEST_TIMER_LIMIT") or 5)):
                current_request.time = datetime.now()
            else:
                abort(HttpError.TOO_MANY_REQUESTS, "Too many requests")
    else:
        current_request.time = datetime.now()

def get_user_email(token: str, salt: str):
    try:
        email = s.loads(token, salt=salt, max_age=3600)
        return email
    except SignatureExpired:
        abort(HttpError.PRECONDITION_FAILED, "Token has expired")
    except (BadTimeSignature, BadSignature):
        abort(HttpError.NOT_ACCEPTABLE, "The token you submitted was incorrect")