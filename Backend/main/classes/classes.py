from config.config import app, db

class User(db.Model):
    __tablename__ = "User"

    id = db.Column(db.Integer, primary_key = True, nullable = False)
    type = db.Column(db.String(128), nullable = False)
    name = db.Column(db.String(256), nullable = False)
    url = db.Column(db.String(128))
    username = db.Column(db.String(256), unique = True, nullable = False)
    email = db.Column(db.String(2048), unique = True, nullable = False)
    confirmed = db.Column(db.Boolean, nullable = False)
    password = db.Column(db.String(256), nullable = False)
    salt = db.Column(db.String(256), unique = True, nullable = False)
    gender = db.Column(db.String(48))

    def __repr__(self) -> str:
        return f'id:{self.id},type:{self.type},name:{self.name},username":{self.username},email:{self.email},password:{self.password}'

# CREATE TABLE User (
#     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
#     type VARCHAR(128) NOT NULL,
#     name VARCHAR(256) NOT NULL,
#     url VARCHAR(128) NOT NULL,
#     username VARCHAR(256) UNIQUE NOT NULL,
#     email VARCHAR(512) UNIQUE NOT NULL,
#     confirmed BOOLEAN NOT NULL,
#     password VARCHAR(256) UNIQUE NOT NULL,
#     gender VARCHAR(48)
# );

class Report(db.Model):
    __tablename__ = "Report"

    id = db.Column(db.Integer, primary_key = True, nullable = False)
    lat = db.Column(db.String(256), nullable = False)
    lon = db.Column(db.String(256), nullable = False)
    url = db.Column(db.String(128))
    status = db.Column(db.String(128), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey("User.id"), nullable = False)

    User = db.relationship("User", backref = db.backref("Report"), lazy = True)

# CREATE TABLE Report (
#     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
#     lat VARCHAR(256) NOT NULL,
#     lon VARCHAR(256) NOT NULL,
#     url VARCHAR(128) NOT NULL,
#     status VARCHAR(128) NOT NULL,
#     user_id INT NOT NULL,
#     FOREIGN KEY (user_id) REFERENCES User(id)
# );

class Issue(db.Model):
    __tablename__ = "Issue"

    id = db.Column(db.Integer, primary_key = True, nullable = False)
    name = db.Column(db.String(256), nullable = False)
    description = db.Column(db.String(1024))
    fixed = db.Column(db.Boolean, nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey("User.id"), nullable = False)

    User = db.relationship("User", backref = db.backref("Issue"), lazy = True)

# CREATE TABLE Issue (
#     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
#     name VARCHAR(256) NOT NULL,
#     description VARCHAR(1024) NOT NULL DEFAULT "",
#     fixed BOOLEAN NOT NULL,
#     user_id INT NOT NULL,
#     FOREIGN KEY (user_id) REFERENCES User(id)
# );

class Request(db.Model):
    __tablename__ = "Request"

    id = db.Column(db.Integer, primary_key = True, nullable = False)
    type = db.Column(db.String(128), nullable = False)
    time = db.Column(db.String(512))
    user_id = db.Column(db.Integer, db.ForeignKey("User.id"), nullable = False)

    User = db.relationship("User", backref = db.backref("Request"), lazy = True)

# CREATE TABLE Request (
#     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
#     type VARCHAR(128) NOT NULL,
#     time VARCHAR(512) NOT NULL,
#     user_id INT NOT NULL,
#     FOREIGN KEY (user_id) REFERENCES User(id)
# );

with app.app_context():
    db.create_all()