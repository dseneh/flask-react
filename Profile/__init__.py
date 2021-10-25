from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_mail import Mail
from dotenv import load_dotenv
from os import getenv
from flask_mongoengine import MongoEngine

load_dotenv()

app = Flask(__name__, static_folder="./static/build", static_url_path="/")

SECRET_KEY = getenv("SECRET_KEY")
JWT_SECRET_KEY = getenv("JWT_SECRET_KEY")
MONGODB_SETTINGS = getenv("MONGODB_SETTINGS")
MAIL_PASSWORD = getenv("MAIL_PASSWORD")
MAIL_USERNAME = getenv("MAIL_USERNAME")
DEFAULT_SENDER = getenv("DEFAULT_SENDER")
MAIL_SERVER = getenv("MAIL_SERVER")

app.config['SECRET_KEY'] = SECRET_KEY
app.config['MONGODB_SETTINGS'] = {"host": MONGODB_SETTINGS}
app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
app.config['MAIL_SERVER'] = MAIL_SERVER
app.config['MAIL_PORT'] = 465
app.config['DEFAULT_SENDER'] = DEFAULT_SENDER
app.config['MAIL_USERNAME'] = MAIL_USERNAME
app.config['MAIL_PASSWORD'] = MAIL_PASSWORD
# app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = True

db = MongoEngine(app)
cors = CORS(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
mail = Mail(app)

from Profile import database
from Profile import routes
from Profile import AUTH
