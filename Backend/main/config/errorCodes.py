from enum import Enum

class HttpError(Enum):
    BAD_REQUEST = ("Bad request", 400)
    UNAUTHORIZED = ("Unauthorized", 401)
    NOT_FOUND = ("Not found", 404)
    METHOD_NOT_ALLOWED = ("Method not allowed", 405)
    NOT_ACCEPTABLE = ("Not acceptable", 406)
    CONFLICT = ("Conflict", 409)
    PRECONDITION_FAILED = ("Precondition failed", 412)
    TOO_MANY_REQUESTS = ("Too many requests", 429)
    INTERNAL_SERVER_ERROR = ("Internal server error", 500)

    def __init__(self, message, code):
        self.message = message
        self.code = code