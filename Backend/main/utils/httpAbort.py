from typing import NoReturn
from config.errorCodes import HttpError
from config.httpException import HttpException

def abort(error: HttpError, message: str | None = None) -> NoReturn:
    raise HttpException(error, message)