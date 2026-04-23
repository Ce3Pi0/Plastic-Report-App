import os
from dotenv import load_dotenv

# Load .env Environment Variables
load_dotenv()

def get_domain(env: str, prod_domain: str | None, dev_domain) -> str:
    if env == "PRODUCTION":
        if not prod_domain:
            raise RuntimeError("Production domain not specified")
        return prod_domain
    else:
        return dev_domain

get_env = {
    "ENV": os.getenv("ENV", "DEVELOPMENT"),
    "PASS_LEN": int(os.getenv("PASS_LEN", "6")),
    "SECRET_KEY": os.getenv("SECRET_KEY"),
    "JWT_SECRET": os.getenv("JWT_SECRET"),
    "FRONTEND_PORT": os.getenv("FRONTEND_PORT", "8100"),
    "DEV_FRONTEND_DOMAIN": os.getenv("DEV_FRONTEND_DOMAIN", "localhost:"),
    "PROD_FRONTEND_DOMAIN": os.getenv("PROD_FRONTEND_DOMAIN"),
    "DATABASE_URL": os.getenv("DATABASE_URL"),
    "MY_MAIL": os.getenv("MY_MAIL"),
    "MAIL_SERVER": os.getenv("MAIL_SERVER"),
    "MAIL_PORT": os.getenv("MAIL_PORT", "587"),
    "MAIL_USERNAME": os.getenv("MAIL_USERNAME"),
    "MAIL_PASSWORD": os.getenv("MAIL_PASSWORD"),
    "REQUEST_TIMER_LIMIT": os.getenv("REQUEST_TIMER_LIMIT", "5"),
    "HOST": os.getenv("HOST", "0.0.0.0"),
    "CLOUDINARY_NAME": os.getenv("CLOUDINARY_NAME"),
    "CLOUDINARY_API_KEY": os.getenv("CLOUDINARY_API_KEY"),
    "CLOUDINARY_API_SECRET": os.getenv("CLOUDINARY_API_SECRET"),
}


get_env["FRONTEND_DOMAIN"] = f"${get_domain(get_env["ENV"], get_env["PROD_FRONTEND_DOMAIN"], get_env["DEV_FRONTEND_DOMAIN"])}{get_env["FRONTEND_PORT"]}"