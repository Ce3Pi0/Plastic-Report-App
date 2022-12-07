from flask import jsonify
import bcrypt

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