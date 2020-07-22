from config import db, login
import datetime
import matplotlib
from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import UserMixin
import os
import random


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    first_name = db.Column(db.String(20), index=True)
    last_name = db.Column(db.String(20), index=True)
    position = db.Column(db.Integer, index=True)
    avail_restriction = db.relationship(
        'AvailRestriction', backref='user', lazy=True)
    request_offs = db.relationship(
        'OffDays', backref='user', lazy=True)
    password_hash = db.Column(db.String(128))
    color = db.Column(db.String(20), index=True, unique=True)
    slug = db.Column(db.String(20), index=True, unique=True)
    workblocks = db.relationship('WorkBlock', backref='user', lazy=True)

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)
        self.set_color()

    def to_json(self):
        return{
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'position': self.position,
            'color': self.color,
            'id': self.id,
            'slug': self.slug,
        }

    def set_position(self, x):
        if x == 'crew':
            self.position = 0
        else:
            self.position = 1

    def __repr__(self):
        return 'User {}'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def get_position(self):
        if self.position:
            return 'manager'
        return 'crew'

    def set_color(self):
        while True:
            print('Hay')
            r = random.randint(0, 255)/255
            g = random.randint(0, 255)/255
            b = random.randint(0, 255)/255
            color = matplotlib.colors.to_hex([r, g, b])
            if User.query.filter_by(color=color).all():
                continue
            else:
                break
        self.color = color
        db.session.commit()


class AvailRestriction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    weekday = db.Column(db.Integer, index=True)
    start_time = db.Column(db.Integer)
    end_time = db.Column(db.Integer)

    def __repr__(self):
        return 'Cannot Work {}'.format(self.weekday)


class OffDays(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    day = db.Column(db.Integer, index=True)
    month = db.Column(db.Integer, index=True)
    year = db.Column(db.Integer, index=True)

    def __repr__(self):
        return 'Request Off {}/{}/{}'.format(self.month, self.day, self.year)


class Day(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, index=True)
    month = db.Column(db.Integer, index=True)
    day = db.Column(db.Integer, index=True)
    workblocks = db.relationship('WorkBlock', backref='day', lazy=True)

    def weekday(self):
        return datetime.date(self.year, self.month, self.day).weekday()


class WorkBlock(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    worker_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    start_time = db.Column(db.Integer, index=True)
    end_time = db.Column(db.Integer, index=True)
    day_id = db.Column(db.Integer, db.ForeignKey('day.id'))


@login.user_loader
def load_user(id):
    return User.query.get(int(id))
