import cloudinary
from config.get_env import get_env


class CloudinaryConfig:
    @staticmethod
    def init():
        cloudinary.config(cloud_name = get_env.get('CLOUDINARY_NAME'), api_key=get_env.get('CLOUDINARY_API_KEY'), 
            api_secret=get_env.get('CLOUDINARY_API_SECRET'))