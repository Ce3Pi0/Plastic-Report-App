import uuid
import codecs
import random
import bcrypt
import re
from utils.httpAbort import methodNotAllowed
from routes.baseRoute import BaseRoute

def createRequest(request, instance: BaseRoute):
    method = request.method
    CRUD = ["POST", "GET", "PUT", "DELETE"]

    if method not in CRUD:
        return methodNotAllowed()

    if method == "GET":
        return instance.read(request)
    elif method == "POST":
        return instance.create(request)
    elif method == "PUT":
        return instance.update(request)
    elif method == "DELETE":
        return instance.delete(request)



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