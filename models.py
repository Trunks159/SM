from config import db, login
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime, timedelta
from flask_login import UserMixin
import calendar
from dateutil import parser


DAYS_OF_WEEK = ['monday', 'tuesday', 'wednesday',
                'thursday', 'friday', 'saturday', 'sunday']


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    first_name = db.Column(db.String(20), index=True)
    last_name = db.Column(db.String(20), index=True)
    position = db.Column(db.Integer, index=True)
    password_hash = db.Column(db.String(128))
    workblocks = db.relationship('WorkBlock', backref='user', lazy=True)
    availability = db.relationship(
        'Availability', uselist=False, backref='user', lazy=True)
    request_offs = db.relationship(
        'RequestOff', backref='user', lazy='dynamic')

    def to_json(self):
        return {
            'username': self.username,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'position': self.position,
            'id': self.id,
            'requestOffs': [request.to_json() for request in self.request_offs.all()],
            'availability': self.availability.to_json() if self.availability else []
        }

    def __repr__(self):
        return f'User {self.username}'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def add_request_off(self, start, end):
        # side effect
        # sees if dates inputted conflict with some that already exist
        # if the date we're trying to add is adjacent to another requestOff's date,
        # alter the time of the request off we found

        start = parser.parse(start)
        end = parser.parse(end)
        will_add_request = True
        my_requests = self.request_offs.all()
        for request in my_requests:
            if request.is_between(start, end):
                will_add_request = False
                # priotitize extreme values
                start_changed = start < parser.parse(request.start) or False
                end_changed = end > parser.parse(request.end) or False
                if start_changed or end_changed:
                    request.start = start.isoformat()
                    request.end = end.isoformat()

        if will_add_request:
            db.session.add(RequestOff(user=self, start=start, end=end))
            db.session.commit()
            return {'wasSuccessful': True}
        return {'wasSuccessful': False}


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

    def to_json(self):
        days = []
        for day in DAYS_OF_WEEK:
            day_availability = getattr(self, day).split(
                '-') if getattr(self, day) else True
            days.append(day_availability)
        return days


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

    def complete_schedule_set(self):
        # makes a set of week objects
        # 2 weeks before and infinitely far after this week

        next_weeks = WeekSchedule.query.filter(
            WeekSchedule.monday_date >= self.monday_date).order_by(WeekSchedule.monday_date).all()
        # add weeks until two next weeks requirement is  filled
        while len(next_weeks) < 3:
            new_week = next_weeks[len(next_weeks) -
                                  1].monday_date + timedelta(days=7)

            next_weeks.append(WeekSchedule().create_week(new_week))
        two_prior_weeks = WeekSchedule.query.filter(
            WeekSchedule.monday_date < self.monday_date).order_by(WeekSchedule.monday_date).limit(2).all()
        return two_prior_weeks + next_weeks

    def fill_week(self, date):
        # side effect
        monday = date - timedelta(date.weekday())
        self.monday_date = monday
        for i in range(7):
            day = Day(date=monday + timedelta(i), week_schedule=self)
            db.session.add(day)
        db.session.commit()
        return self


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
            'user': {'id': self.user_id, 'firstName': user.first_name, 'lastName': user.last_name, 'position': user.position},
            'dayId': self.day_id,
            'startTime': self.start_time.isoformat(' '),
            'endTime':  self.end_time.isoformat(' '),
        }


class RequestOff(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    start = db.Column(db.String(40))
    end = db.Column(db.String(40))

    def to_json(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'start': parser.parse(self.start).isoformat(),
            'end':  parser.parse(self.end).isoformat(),
        }

    def is_between(self, new_start, new_end):
        # they are dt objects
        # sees if 1 range of dates is between in any way another
        start = parser.parse(self.start)
        end = parser.parse(self.end)
        start_is_between = (new_start >= start) & (new_start <= end)
        end_is_between = (new_end >= start) & (new_end <= end)
        return start_is_between or end_is_between


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


def test():
    u = User.query.first()
    start = datetime(2022, 10, 17, 4)
    end = datetime(2022, 10, 18)
    return u.add_request_off(start, end)
