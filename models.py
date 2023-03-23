from config import db, login
from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import UserMixin
import calendar
from dateutil import parser
from sqlalchemy.orm import validates
from datetime import timedelta
from tzlocal import get_localzone

BASE_DATE = "1970-01-01T00:00:00-04:00"

DAYS_OF_WEEK = ['monday', 'tuesday', 'wednesday',
                'thursday', 'friday', 'saturday', 'sunday']


def tz_aware(dt):
    return dt.replace(tzinfo=get_localzone())


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    first_name = db.Column(db.String(20), index=True, nullable=False)
    last_name = db.Column(db.String(20), index=True, nullable=False)
    position = db.Column(db.String(20), index=True,
                         nullable=False, default='team member')
    password_hash = db.Column(db.String(128))
    workblocks = db.relationship('WorkBlock', backref='user', lazy='dynamic')
    availability = db.relationship(
        'Availability', backref='user', lazy='dynamic')
    request_offs = db.relationship(
        'RequestOff', backref='user', lazy='dynamic')

    def to_json(self):
        return {
            'username': self.username,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'position': self.position,
            'id': self.id,
            'requestOffs': self.get_request_offs(),
            'availability': self.get_availability()
        }

    def __repr__(self):
        return f'User {self.username}'

    @validates('username')
    def validate_username(self, key, username):
        assert not User.query.filter_by(
            username=username).first(), 'Username is already in user'
        assert not (len(username) < 5 or len(username) >
                    25), 'Username must be between 5 and 25 characters'
        assert username.strip() == username, 'Can have any whitespace in username'
        assert bool(username), "Cant have an empty username my guy"
        return username

    @validates('first_name')
    @validates('last_name')
    @validates('position')
    def validate_string(self, key, string):
        assert string.islower(), 'All strings must be lower case other than usernames'
        assert string.strip() == string, 'Can have any whitespace'
        return string

    @validates('position')
    def validate_position(self, key, position):
        assert position in [
            'team leader', 'team member'], 'The only options for position are team leader and team member'
        return position

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def get_request_offs(self):
        reqs = self.request_offs.order_by(RequestOff.start).all()
        return [req.to_json() for req in reqs]

    def get_availability(self):
        ava = self.availability.order_by(Availability.start).all()
        if not len(ava):
            ava = self.create_availability()
        return [a.to_json() for a in ava]

    def create_availability(self):
        # side effect
        start_time = parser.parse(BASE_DATE)
        end_time = parser.parse(BASE_DATE) + timedelta(days=1)
        ava = [Availability(user=self, start=start_time,
                            end=end_time, weekday=i) for i in range(7)]
        db.session.add_all(ava)
        db.session.commit()
        return ava


class Availability(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    start = db.Column(db.DateTime)
    end = db.Column(db.DateTime)
    available = db.Column(db.Boolean, default=True)
    weekday = db.Column(db.Integer, nullable=False, index=True)

    def to_json(self):
        return {
            'start': tz_aware(self.start).isoformat(),
            'end': tz_aware(self.end).isoformat(),
            'weekday': self.start.weekday(),
            'available': self.available,
        }


class Day(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, unique=True, nullable=False, index=True)
    workblocks = db.relationship('WorkBlock', backref='day', lazy=True)
    projected_sales = db.Column(db.Integer, default=4000)
    week_id = db.Column(db.Integer, db.ForeignKey('week.id'), nullable=False)

    def __repr__(self):
        return self.date.isoformat()

    def to_json(self):
        return {
            'id': self.id,
            'weekday': list(calendar.day_name)[self.date.weekday()],
            'index': self.date.weekday(),
            'date': tz_aware(self.date).isoformat(),
            'projectedSales': self.projected_sales,
            'workblocks': [workblock.to_json() for workblock in self.workblocks],
            'staffing': {'actual': 6, 'projected': 20},
            'weekId': self.week_id,
        }

    @validates('date')
    def validate_date(self, key, date):
        assert date.hour == 0 and date.minute == 0 and date.second == 0 \
            & date.microsecond == 0, 'Time must be set to 0'
        return date


class Week(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    monday_date = db.Column(db.DateTime, nullable=False,
                            unique=True, index=True)
    days = db.relationship('Day', backref='week', lazy=True)

    def has_date(self, d):
        for item in self.week:
            if d == item.date:
                return True
            break
        return False

    def to_json(self):
        week = sorted(self.days, key=lambda x: x.date)
        return ({
            'id': self.id,
            'days': [day.to_json() for day in week],
            'staffing': {'actual': 6, 'projected': 7},
            'mondayDate': tz_aware(self.monday_date).isoformat()
        })


class WorkBlock(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user.id'), unique=True, nullable=False)
    day_id = db.Column(db.Integer, db.ForeignKey('day.id'), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)

    def to_json(self):
        user = User.query.get(self.user_id)
        return {
            'wbId': self.id,
            'user': {'id': self.user_id, 'firstName': user.first_name, 'lastName': user.last_name, 'position': user.position},
            'dayId': self.day_id,
            'startTime': tz_aware(self.start_time).isoformat(),
            'endTime':  tz_aware(self.end_time).isoformat(),
        }


class RequestOff(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    # needs to be datetime
    start = db.Column(db.DateTime, index=True, nullable=False)
    end = db.Column(db.DateTime, index=True)

    def to_json(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'start': self.start.isoformat() + '-04:00',
            'end': self.end.isoformat() + '-04:00',
        }

    def is_between(self, new_start, new_end):
        # they are dt objects
        # sees if 1 range of dates is between in any way another
        start = tz_aware(self.start)
        end = tz_aware(self.end)
        start_is_between = (new_start >= start) & (new_start <= end)
        end_is_between = (new_end >= start) & (new_end <= end)
        return start_is_between or end_is_between


@ login.user_loader
def load_user(id):
    return User.query.get(int(id))
