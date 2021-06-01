from config import db, login
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime
from flask_login import UserMixin


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    first_name = db.Column(db.String(20), index=True)
    last_name = db.Column(db.String(20), index=True)
    position = db.Column(db.Integer, index=True)
    password_hash = db.Column(db.String(128))
    color = db.Column(db.String(20), index=True, unique=True)
    slug = db.Column(db.String(20), index=True, unique=True)
    workblocks = db.relationship('WorkBlock', backref='user', lazy=True)
    availability = db.relationship('Availability', backref='user', lazy=True)

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
            'is_authenticated': True
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
        import random
        import matplotlib
        while True:
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


class Availability(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    monday = db.Column(db.String(30))
    tuesday = db.Column(db.String(30))
    wednesday = db.Column(db.String(30))
    thursday = db.Column(db.String(30))
    friday = db.Column(db.String(30))
    saturday = db.Column(db.String(30))
    sunday = db.Column(db.String(30))

    def getAvail(self, dayofWeek):
        x = getattr(self, dayofWeek)
        x = x.split('-')
        times = []
        for time in x:
            t = datetime.strptime(time, '%H:%M')
            times.append(t)

        return times


class Day(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)
    state = db.Column(db.String(30))
    workblocks = db.relationship('WorkBlock', backref='day', lazy=True)

    def __repr__(self):
        return self.date.isoformat()

    def check_state(self):
        if len(self.workblocks) >= 7:
            self.state = 'complete'

        elif self.state != 'incomplete':
            today = datetime.today()
            if (today - self.date).days > 0:
                self.state = 'inactive'
            if self.state == None:
                self.state = 'available'
        return self.state

    def color(self):
        return {'available': 'blue', 'complete': 'green',
                'incomplete': 'red', 'inactive': 'gray', '': 'orange'}[self.check_state()]

    def from_json(self, json):
        for key in json:
            setattr(self, key, json[key])

    def to_json(self):
        return{
            'id': self.id,
            'color': self.color(),
            'state': self.check_state(),
            'year': self.date.year,
            'month': self.date.month,
            'day': self.date.day,
            'weekday': self.date.weekday(),
            'date': self.date.isoformat(),
            'workblocks': [workblock.to_json() for workblock in self.workblocks]

        }

    def json_workblocks(self):
        sliders = self.workblocks


class WorkBlock(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    day_id = db.Column(db.Integer, db.ForeignKey('day.id'))
    # time is stored in seconds
    start_time = db.Column(db.Integer)
    end_time = db.Column(db.Integer)

    def to_json(self):
        return{
            'id': self.id,
            'user_id': self.user.id,
            'start_time': self.start_time,
            'end_time': self.end_time,
            'day_id': self.day.id
        }


@login.user_loader
def load_user(id):
    return User.query.get(int(id))
