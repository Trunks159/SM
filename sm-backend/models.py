from time import time
from config import db, login
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime
from flask_login import UserMixin
import calendar


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
    availability = db.relationship(
        'Availability', uselist=False, backref='user', lazy=True)
    request_offs = db.relationship('RequestOff', backref='user', lazy=True)

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)
        self.set_color()

    def to_json(self):
        return{
            'username': self.username,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'position': self.position,
            'color': self.color,
            'id': self.id,
            'slug': self.slug,
            'isAuthenticated': True,
            # this is a placeholder, isAvailable shouldnt be in the final product
            'isAvailable': True,
            'availability': self.availability.to_json() if self.availability else None,
            'upcomingShifts': self.get_upcoming_shifts(),
            'upcomingRequestOffs': self.get_upcoming_request_offs(),
        }

    def get_upcoming_shifts(self):
        return [workblock.to_json() for workblock in self.workblocks]

    def get_upcoming_request_offs(self):
        return [req.to_json() for req in self.request_offs]

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
        weekdays = ['monday', 'tuesday', 'wednesday',
                    'thursday', 'friday', 'saturday', 'sunday']
        d = {}
        for weekday in weekdays:
            d[weekday] = getattr(self, weekday)
        return d


class Day(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)
    state = db.Column(db.String(30))
    workblocks = db.relationship('WorkBlock', backref='day', lazy=True)
    projected_sales = db.Column(db.Integer, default=4000)
    week_id = db.Column(db.Integer, db.ForeignKey('week_schedule.id'))

    def __repr__(self):
        return self.date.isoformat()

    def from_json(self, json):
        for key in json:
            setattr(self, key, json[key])

    def to_json(self):
        return{
            'id': self.id,
            'year': self.date.year,
            'month': self.date.month,
            'day': self.date.day,
            'weekday': list(calendar.day_name)[self.date.weekday()],
            'date': self.date.isoformat(),
            'projectedSales': self.projected_sales,
            'workblocks': [workblock.to_json() for workblock in self.workblocks]
        }

    def shiftData(self):
        # return object that has 2 shifts morning and night and and data
        # inside of them

        return {'morning_data': self.morning_data(), 'night_data': self.night_data()}

    def morning_data(self):
        projected_sales = self.projected_sales/2
        p = self.get_morning_staffing_and_hours()
        actual_hours = p['hours']
        actual_staffing = p['staffing']
        projected_staffing = 5
        projected_hours = 40
        if projected_sales >= 2000:
            projected_staffing = 6
            projected_hours = 45
            if projected_sales >= 2500:
                projected_staffing = 7
                projected_hours = 53
                if projected_sales >= 3000:
                    projected_staffing = 8
                    projected_hours = 58
        return {'actual_hours': actual_hours, 'actual_staffing': actual_staffing, 'projected_staffing':  projected_staffing, 'projected_hours': projected_hours}

    def get_morning_staffing_and_hours(self):
        # if the workblock's time overlaps for more than 4 hours
        # its is considered a morning shift
        staffing = 0
        hours = 0
        am = [7, 16]
        workblocks = self.workblocks.all()
        for workblock in workblocks:
            test1 = workblock.start_time >= am[0] and workblock.start_time <= am[1]
            test2 = workblock.end_time >= am[0] and workblock.end_time <= am[1]
            if test1 and test2:
                hours += workblock.end_time - workblock.start_time
                if workblock.end_time - workblock.start_time >= 4:
                    staffing += 1
            if test1 == True and test2 == False:
                hours += am[1] - workblock.start_time
                if am[1] - workblock.start_time >= 4:
                    staffing += 1
        return {'staffing': staffing, 'hours': hours}

    def night_data(self):
        projected_sales = self.projected_sales/2
        p = self.get_night_staffing_and_hours()
        actual_hours = p['hours']
        actual_staffing = p['staffing']
        projected_staffing = 5
        projected_hours = 40
        if projected_sales >= 2000:
            projected_staffing = 6
            projected_hours = 45
            if projected_sales >= 2500:
                projected_staffing = 7
                projected_hours = 53
                if projected_sales >= 3000:
                    projected_staffing = 8
                    projected_hours = 58
        return {'actual_hours': actual_hours, 'actual_staffing': actual_staffing, 'projected_staffing':  projected_staffing, 'projected_hours': projected_hours}

    def get_night_staffing_and_hours(self):
        # if the workblock's time overlaps for more than 4 hours
        # its is considered a morning shift
        staffing = 0
        hours = 0
        pm = [16, 23]
        workblocks = self.workblocks.all()
        for workblock in workblocks:
            test1 = workblock.start_time >= pm[0] and workblock.start_time <= pm[1]
            test2 = workblock.end_time >= pm[0] and workblock.end_time <= pm[1]
            if test1 and test2:
                hours += workblock.end_time - workblock.start_time
                if workblock.end_time - workblock.start_time >= 4:
                    staffing += 1
            if test1 == False and test2 == True:
                hours += pm[1] - workblock.start_time
                if workblock.end_time - pm[0] >= 4:
                    staffing += 1
        return {'staffing': staffing, 'hours': hours}


class WeekSchedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    monday_date = db.Column(db.DateTime)
    week = db.relationship('Day', backref='week_schedule', lazy=True)

    def to_json(self):
        week = sorted(self.week, key=lambda x: x.date)
        return({
            'schedule': [day.to_json() for day in week],
            'staffing': {'actual': 6, 'projected': 7}
        })


class WorkBlock(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    day_id = db.Column(db.Integer, db.ForeignKey('day.id'))
    # time is stored in 00:00-12:00 format
    start_time = db.Column(db.String(30))
    end_time = db.Column(db.String(30))

    def to_json(self):
        return{
            'user': self.get_user(),
            'startTime': self.start_time,
            'endTime': self.end_time,
            'date': self.get_date(),
        }

    def get_date(self):
        day = Day.query.filter_by(id=self.day_id).first()
        return {'month': day.date.month, 'day': day.date.day, 'year': day.date.year}

    def get_user(self):
        user = User.query.filter_by(id=self.user_id).first()
        return {'firstName': user.first_name, 'lastName': user.last_name}

    def __repr__(self):
        return 'Workblock, UserID:{} Start and End Time: {}'.format(self.user_id, self.start_time + '-' + self.end_time)


class RequestOff(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    date = db.Column(db.String(30))
    # time is stored in 00:00-12:00 format
    start_time = db.Column(db.String(30))
    end_time = db.Column(db.String(30))

    def to_json(self):
        return {
            'date': self.date,
        }


@login.user_loader
def load_user(id):
    return User.query.get(int(id))
