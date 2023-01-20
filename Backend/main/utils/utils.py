from flask import jsonify
import random
import bcrypt
import re

from routes.baseRoute import BaseRoute

def customAbort(msg: str, code:int):
    return jsonify({
        "message":msg,
        "code":code
    }), code

def createReqeust(request, instance: BaseRoute):
    method = request.method
    CRUD = ["POST", "GET", "PUT", "DELETE"]

    if method not in CRUD:
        return customAbort("Method not allowed", 405)        

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

def hashPassword(password: str, salt: bytes) -> str:
    password = password.encode("UTF-8")
    return bcrypt.hashpw(password, salt)
    
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