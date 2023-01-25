from config import db, login
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime, timedelta
from flask_login import UserMixin
import calendar


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    first_name = db.Column(db.String(20), index=True)
    last_name = db.Column(db.String(20), index=True)
    position = db.Column(db.String(20), index=True)
    password_hash = db.Column(db.String(128))
    workblocks = db.relationship('WorkBlock', backref='user', lazy=True)
    availability = db.relationship(
        'Availability', uselist=False, backref='user', lazy=True)
    request_offs = db.relationship('RequestOff', backref='user', lazy=True)

    def to_json(self):
        return {
            'username': self.username,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'position': self.position,
            'id': self.id,
        }

    def __repr__(self):
        return 'User {}'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

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

    def __repr__(self):
        return 'Availa {}'.format(self.to_json())

    def getAvail(self, dayofWeek):
        x = getattr(self, dayofWeek)
        x = x.split('-')
        times = []
        for time in x:
            t = datetime.strptime(time, '%H:%M')
            times.append(t)

        return times

    def to_json(self):
        return {
            'monday' : self.monday,
            'tuesday' : self.tuesday,
            'wednesday' : self.wednesday,
            'thursday' : self.thursday,
            'friday' : self.friday,
            'saturday' : self.saturday,
            'sunday' : self.sunday,
            'id' : self.id,
            'userId' : self.user_id,
        }


class Day(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)
    workblocks = db.relationship('WorkBlock', backref='day', lazy=True)
    projected_sales = db.Column(db.Integer, default=4000)
    week_id = db.Column(db.Integer, db.ForeignKey('week_schedule.id'))

    def __repr__(self):
        return self.date.isoformat()

    def to_json(self):
        return {
            'id': self.id,
            'weekday': list(calendar.day_name)[self.date.weekday()],
            'index': self.date.weekday(),
            'date': self.date.isoformat(' '),
            'projectedSales': self.projected_sales,
            'workblocks': [workblock.to_json() for workblock in self.workblocks],
            'staffing': {'actual': 6, 'projected': 20},
            'weekId': self.week_id,
        }

class WeekSchedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    monday_date = db.Column(db.DateTime)
    week = db.relationship('Day', backref='week_schedule', lazy=True)

    def has_date(self, d):
        for item in self.week:
            if d == item.date:
                return True
            break
        return False

    def to_json(self):
        week = sorted(self.week, key=lambda x: x.date)
        return ({
            'id': self.id,
            'week': [day.to_json() for day in week],
            'staffing': {'actual': 6, 'projected': 7},
        })

    def create_week(self, date):
        monday = date - timedelta(date.weekday())
        self.monday_date = monday
        for i in range(7):
            day = Day(date=monday + timedelta(i), week_schedule=self)
            db.session.add(day)
        db.session.commit()
        return self

    def initialize(self, date):
        return self.create_week(date)


class WorkBlock(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    day_id = db.Column(db.Integer, db.ForeignKey('day.id'))
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)

    def to_json(self):
        user = User.query.get(self.user_id)
        return {
            'wbId': self.id,
            'user': {'id': self.user_id, 'firstName': user.first_name, 'lastName': user.last_name, 'position' : user.position},
            'dayId': self.day_id,
            'startTime': self.start_time.isoformat(' '),
            'endTime':  self.end_time.isoformat(' '),
        }


class RequestOff(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)

    def to_json(self):
        return {
            'startTime' : self.start_time,
            'endTime'
        }


@login.user_loader
def load_user(id):
    return User.query.get(int(id))
