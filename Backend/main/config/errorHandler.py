from config.errorCodes import HttpError
from utils.httpAbort import *

def register_error_handlers(app):
    @app.errorhandler(HttpError.NOT_FOUND.code)
    def handle_404(err):
        return notFound("Page not found!")

    @app.errorhandler(HttpError.BAD_REQUEST.code)
    def handle_400(err):
        return badRequest();

    @app.errorhandler(HttpError.UNAUTHORIZED.code)
    def handle_401(err):
        return unauthorized();

    @app.errorhandler(HttpError.INTERNAL_SERVER_ERROR.code)
    def handle_500(err):
        return internalServerError()