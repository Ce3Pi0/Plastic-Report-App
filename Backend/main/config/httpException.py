from config.errorCodes import HttpError

class HttpException(Exception):
    def __init__(self, error: HttpError, message: str | None = None):
        self.error = error
        self.message = message or error.message
        self.code = error.code
        super().__init__(self.message)