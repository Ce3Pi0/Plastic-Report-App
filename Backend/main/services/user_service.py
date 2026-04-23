import hmac
from werkzeug.datastructures import FileStorage
from config.config import db
from services.base_service import BaseService
from classes.classes import User, Request
from utils.httpAbort import abort
from config.httpException import HttpError
from utils.utils import validate_privilege, genSalt, hashPassword, decode_postgres_bytea
from validators.user_validators import UserCreateSchema, UserUpdateSchema
from cloudinary.uploader import upload, destroy

class UserService(BaseService):
    @staticmethod
    def create(body: UserCreateSchema):
        user = User.query.filter_by(username=body.current_username).first()

        if user is None:
            abort(HttpError.NOT_FOUND, "User not found")

        salt = user.salt
        hashed_pass = hashPassword(body.current_password, salt).decode("UTF-8")
        
        if not hmac.compare_digest(user.password, hashed_pass):
            abort(HttpError.UNAUTHORIZED, "Wrong password")

        if not validate_privilege(user.type):
            abort(HttpError.METHOD_NOT_ALLOWED, "Unauthorized")

        check_username = User.query.filter_by(username = body.username).first()
        check_email = User.query.filter_by(email = body.email).first()

        if check_username is not None or check_email is not None:
            abort(HttpError.CONFLICT, "User already exists")

        new_user_salt = genSalt()
        new_user_hashed_pw = hashPassword(body.password, new_user_salt)

        new_user = User(name = body.name, username = body.username, url = None,
        confirmed = True, email = body.email, password = new_user_hashed_pw, salt = new_user_salt, type = body.type, gender = body.gender)

        user_request_email = Request(type="password_request", time=None, user_id=new_user.id)
        user_request_password = Request(type="email_request", time=None, user_id=new_user.id)
        
        db.session.add(new_user)
        db.session.commit()

        user_request_email = Request(type="password_request", time=None, user_id=new_user.id)
        user_request_password = Request(type="email_request", time=None, user_id=new_user.id)

        db.session.add(user_request_email)
        db.session.add(user_request_password)

        db.session.commit()

    @staticmethod
    def read(user_id: str, user_to_read_id: str | None, should_query: bool):
        user = User.query.filter_by(id=user_id).first()

        if user is None:
            abort(HttpError.NOT_FOUND, "User not found")

        view_user = user

        if view_user is None:
            abort(HttpError.NOT_FOUND, "User not found")

        if should_query and not validate_privilege(user.type):
            abort(HttpError.UNAUTHORIZED, "User not an admin")

        if should_query:
            all_users = User.query.all()

            output = []
            for user in all_users:
                data = {
                    "id":user.id, 
                    "name":user.name,
                    "username":user.username,
                    "img_url": user.url,
                    "confirmed":user.confirmed,
                    "email":user.email,
                    "type":user.type,
                    "gender":user.gender
                    }
                output.append(data)
            return output

        if user_to_read_id is not None:
            if user_to_read_id != view_user.id and validate_privilege(user.type): 
                view_user = User.query.filter_by(id=user_to_read_id).first()

        data = {
            "id":view_user.id,
            "name":view_user.name,
            "username":view_user.username,
            "img_url": view_user.url,
            "confirmed":view_user.confirmed,
            "email":view_user.email,
            "type":view_user.type,
            "gender": view_user.gender
            }
    
        return data

    @staticmethod
    def update(user_id: str, user_to_update_id: str | None, image: FileStorage | None, body: UserUpdateSchema | None):
        user = User.query.filter_by(id=user_id).first()
 
        if user is None:
            abort(HttpError.NOT_FOUND, "User not found")
        
        user_to_update = user

        if user_to_update_id is not None and user_id != user_to_update_id and validate_privilege(user.type):
            user_to_update = User.query.filter_by(id=user_to_update).first()
        if image is not None:
            result = upload(image, folder="users", unique_filename=True)
            
            img_url = result["secure_url"]
            public_url = result["public_id"]
            
            if user_to_update.public_url is not None:
                destroy(user_to_update.public_url)

            user_to_update.url = img_url
            user_to_update.public_url = public_url
            db.session.commit()

            return

        if body is None:
            abort(HttpError.INTERNAL_SERVER_ERROR, "Data transmission error")

        if validate_privilege(user.type) or user_id == user_to_update_id:
            user_password = decode_postgres_bytea(user.password)
            user_salt = decode_postgres_bytea(user.salt)

            if user_password is None or user_salt is None:
                abort(HttpError.INTERNAL_SERVER_ERROR, "User data corrupted")

            hashed_pass = hashPassword(body.password, user_salt).decode("UTF-8")
        
            if not hmac.compare_digest(user_password.decode("UTF-8"), hashed_pass):
                abort(HttpError.UNAUTHORIZED, "Password doesn't match")

        if body.password == body.new_password:
            abort(HttpError.PRECONDITION_FAILED, "New password cannot be the same as the old one")

        salt = genSalt()
        new_hashed_pw = hashPassword(body.new_password, salt)

        user_to_update.salt = salt
        user_to_update.password = new_hashed_pw

        db.session.commit()

    @staticmethod
    def delete(user_id: str, user_to_delete_id: str):
        user = User.query.filter_by(id=user_id).first()

        if user is None:
            abort(HttpError.NOT_FOUND, "User not found")

        if not validate_privilege(user.type):
            abort(HttpError.UNAUTHORIZED, "Privilege too low!")

        user_to_delete = User.query.filter_by(id=user_to_delete_id).first()

        if user_to_delete is None:
            abort(HttpError.NOT_FOUND, "User to delete not found")

        if validate_privilege(user_to_delete.type):
            abort(HttpError.METHOD_NOT_ALLOWED, "Cannot delete an admin user")
        
        if user_to_delete.public_url is not None:
            destroy(user_to_delete.public_url)

        db.session.delete(user_to_delete)
        db.session.commit()