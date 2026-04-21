from flask import jsonify
from config.errorCodes import HttpError

def customAbort(message, code):
    return jsonify({
        "message":message,
        "code":code
    }), code

def badRequest(message: str = HttpError.BAD_REQUEST.message):
    return customAbort(message, HttpError.BAD_REQUEST.code)

def unauthorized(message: str = HttpError.UNAUTHORIZED.message):
    return customAbort(message, HttpError.UNAUTHORIZED.code)

def notFound(message: str = HttpError.NOT_FOUND.message):
    return customAbort(message, HttpError.NOT_FOUND.code)

def methodNotAllowed(message: str = HttpError.METHOD_NOT_ALLOWED.message):
    return customAbort(message, HttpError.METHOD_NOT_ALLOWED.code)

def notAcceptable(message: str = HttpError.NOT_ACCEPTABLE.message):
    return customAbort(message, HttpError.NOT_ACCEPTABLE.code)

def conflict(message: str = HttpError.CONFLICT.message):
    return customAbort(message, HttpError.CONFLICT.code)

def preconditionFailed(message: str = HttpError.PRECONDITION_FAILED.message):
    return customAbort(message, HttpError.PRECONDITION_FAILED.code)

def tooManyRequests(message: str = HttpError.TOO_MANY_REQUESTS.message):
    return customAbort(message, HttpError.TOO_MANY_REQUESTS.code)

def internalServerError(message: str = HttpError.INTERNAL_SERVER_ERROR.message):
    return customAbort(message, HttpError.INTERNAL_SERVER_ERROR.code)