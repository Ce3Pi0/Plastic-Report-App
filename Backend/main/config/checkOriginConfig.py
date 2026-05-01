from flask import request, abort
from config.get_env import get_env
def check_origin(app):
    @app.before_request
    def check_origin():
        if request.path.startswith('/api/v1/'):
            origin = request.headers.get('Origin')
            referer = request.headers.get('Referer')

            prod_url = str(get_env.get("PROD_FRONTEND_DOMAIN") or "")
            
            is_valid = (origin and origin.startswith(prod_url)) or \
                    (referer and referer.startswith(prod_url))

            if not is_valid:
                app.logger.warning(f"Unauthorized API access blocked: {request.path}")
                abort(403)