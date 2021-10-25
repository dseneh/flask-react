from datetime import datetime, timedelta
from flask_bcrypt import generate_password_hash, check_password_hash
from Profile import db


class User(db.Document):
    _id = db.StringField(default='')
    email = db.EmailField(required=True, unique=True)
    password = db.StringField(required=True, min_length=6)
    active = db.BooleanField(default=True)
    is_admin = db.BooleanField(default=False)

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)


class Profile(db.Document):
    _id = db.StringField(default='')
    first_name = db.StringField(default='Full')
    last_name = db.StringField(default='Name')
    occupation = db.StringField(default='Demo')
    active = db.BooleanField(default=True)
    email = db.EmailField(default='')
    phone = db.StringField(default='')
    linkedin = db.StringField(default='')
    image = db.URLField(default='')
    about = db.StringField(default='')
    last_modified = db.DateTimeField(default=datetime.now())


class Work(db.Document):
    _id = db.StringField(default='')
    title = db.StringField(default='')
    company = db.StringField(default='')
    location = db.StringField(default='')
    desc = db.StringField(default='')
    start = db.StringField(default='')
    end = db.StringField(default='')
    current = db.BooleanField(default=False)
    active = db.BooleanField(default=True)
    order = db.FloatField(default=1)


class Skills(db.Document):
    _id = db.StringField(default='')
    skills = db.StringField(default='')
    active = db.BooleanField(default=True)


class Education(db.Document):
    _id = db.StringField(default='')
    type = db.StringField(default='')
    institution = db.StringField(default='')
    location = db.StringField(default='')
    study = db.StringField(default='')
    start = db.StringField(default='')
    end = db.StringField(default='')
    current = db.BooleanField(default=False)
    desc = db.StringField(default='')
    active = db.BooleanField(default=True)
    order = db.IntField(default=1)


class Contact(db.Document):
    _id = db.StringField(default='')
    type = db.StringField(default='')
    title = db.StringField(default='')
    url = db.StringField(default='')
    active = db.BooleanField(default=True)
    order = db.IntField(default=1)


class RecoveryCode(db.Document):
    _id = db.StringField(default='')
    user = db.StringField(default='')
    code = db.StringField(default='')
    created_at = db.DateTimeField(default=datetime.now())
    expires_at = db.DateTimeField(default=datetime.now() + timedelta(minutes=10))

# git clone https://6b90360f0478d6b6f50453174224dcbae0468851:x-oauth-basic@github.com/dseneh/MyProfile.git