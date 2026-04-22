import uuid
import codecs
import random
import bcrypt
import re
from flask import Request
from utils.httpAbort import abort
from config.errorCodes import HttpError
from controllers.base_controller import BaseController
from typing import Type

def createRequest(request: Request, controller: Type[BaseController]):
    method = request.method
    CRUD = {
        "POST": controller.create(request),
        "GET": controller.read(request),
        "PUT": controller.update(request),
        "DELETE": controller.delete(request)
    }

    if method not in CRUD.keys():
        abort(HttpError.METHOD_NOT_ALLOWED)
    
    return CRUD[method]

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

def get_domain(env: str, prod_domain: str | None, dev_domain) -> str:
    if env == "PRODUCTION":
        if not prod_domain:
            raise RuntimeError("Production domain not specified")
        return prod_domain
    else:
        return dev_domain
    
def decode_postgres_bytea(value) -> bytes | None:
    if isinstance(value, str) and value.startswith("\\x"):
        return codecs.decode(value[2:], "hex")
    return None

# TODO: Use in ID creation for all models
def generate_uuid() -> str:
    return str(uuid.uuid4())

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

def validate_report_status(status: str) -> bool:
    __statuses = ["pending", "completed", "rejected"]
    return status in __statuses

def validate_request_type(req_type: str) -> bool:
    __types = ["password_request", "email_request"]
    return req_type in __types