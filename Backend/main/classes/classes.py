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
    gender = db.Column(db.String(48))

    def __repr__(self) -> str:
        return f'id:{self.id},type:{self.type},name:{self.name},username":{self.username},email:{self.email},password:{self.password}'

class Report(db.Model):
    __tablename__ = "Report"

    id = db.Column(db.Integer, primary_key = True, nullable = False)
    location = db.Column(db.String(256), nullable = False)
    url = db.Column(db.String(128))
    status = db.Column(db.String(128), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey("User.id"), nullable = False)

    User = db.relationship("User", backref = db.backref("Report"), lazy = True)

class Issue(db.Model):
    __tablename__ = "Issue"

    id = db.Column(db.Integer, primary_key = True, nullable = False)
    name = db.Column(db.String(256), nullable = False)
    description = db.Column(db.String(1024))
    fixed = db.Column(db.Boolean, nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey("User.id"), nullable = False)

    User = db.relationship("User", backref = db.backref("Issue"), lazy = True)

with app.app_context():
    db.create_all()