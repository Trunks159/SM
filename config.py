import os
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_migrate import Migrate
from flask_login import LoginManager

basedir = os.path.abspath(os.path.dirname(__file__))


def configure(app):
    config = {'SECRET_KEY': os.environ.get('SECRET_KEY') or 'password',
              'SQLALCHEMY_DATABASE_URI': os.environ.get('DATABASE_URL') or
              'sqlite:///' + os.path.join(basedir, 'app.db'), 'SQLALCHEMY_TRACK_MODIFICATIONS': False,
              }
    for key in config:
        app.config[key] = config[key]


app = Flask(__name__, static_folder='./client/build', static_url_path='/')
configure(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
login = LoginManager(app)
login.login_view = 'login'
