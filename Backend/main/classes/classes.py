from config.config import app, db

class User(db.Model):
    __tablename__ = "User"

    id = db.Column(db.Integer, primary_key = True, nullable = False)
    type = db.Column(db.String(128), nullable = False)
    name = db.Column(db.String(256), nullable = False)
    username = db.Column(db.String(256), unique = True, nullable = False)
    email = db.Column(db.String(2048), unique = True, nullable = False)
    password = db.Column(db.String(256), nullable = False)
    salt = db.Column(db.String(256), unique = True, nullable = False)

    def __repr__(self) -> str:
        return f'id:{self.id},type:{self.type},name:{self.name},username":{self.username},email:{self.email},password:{self.password}'

with app.app_context():
    db.create_all()