import calendar
from email.policy import default
import json
import this
from turtle import position
from flask import request, jsonify
from matplotlib.style import available
from sqlalchemy import false
from config import app, db
from models import User, Day, WorkBlock, Availability, WeekSchedule
from flask_login import current_user, login_user, login_required, logout_user
from datetime import datetime, timedelta
from dates import create_week, complete_schedule_set


@app.route('/')
@app.route('/home')
def home():
    return 'Hello World'


@app.route('/users')
def users():
    users = [user.to_json() for user in User.query.all()]
    user = current_user.to_json() if current_user.is_authenticated else {
        'isAuthenticated': False}
    return jsonify({'users': users, 'currentUser': user})


@app.route('/edit_availability', methods=['POST'])
def edit_availability():

    days = request.get_json()['days']
    username = request.get_json()['username']
    user = User.query.filter_by(username=username).first()
    if user:
        if user.availability == []:
            a = Availability(user=user)
        a = user.availability
        for day in days:
            if day['checked']:
                setattr(a, day['name'], day['value']
                        [0] + '-' + day['value'][1])
            else:
                setattr(a, day['name'], '')

        db.session.add(a)
        db.session.commit()

        return jsonify({'success': True})


@login_required
@app.route('/add_user', methods=['GET', 'POST'])
def add_user():
    # Only managers can access, and it makes a user
    # Users are added using firstname lastname an position
    # if User already exists it stops
    if current_user.position == 'manager':
        user = request.get_json()
        if User.query.filter_by(first_name=user['first_name'], last_name=user['last_name']).first():
            return(jsonify({'success': False, 'message': 'User {} {} already in database'.format(user['first_name'], user['last_name'])}))
        else:
            db.session.add(User(
                first_name=user['first_name'], last_name=user['last_name'], position=user['position']))
            db.session.commit()
            return jsonify({'success': True})
    else:
        print('Must be a manager to access this')
        return(jsonify({'success': False, 'message': 'Must be a manager to access this.'}))


@app.route('/register/<first_name>-<last_name>', methods=['GET', 'POST'])
def register(first_name, last_name):
    data = request.get_json()
    user = User.query.filter_by(first_name=first_name).filter_by(
        last_name=last_name).first()
    if user:
        u = User.query.filter_by(username=data['username']).first()
        if u:
            return jsonify({'response': 'Username Already In Use'})
        else:
            user.username = data['username']
            user.set_password(data['password'])
            db.session.commit()
            return jsonify({'response': True})
    else:
        return jsonify({'response': 'User Not Found'})


@app.route('/user_login', methods=['GET', 'POST'])
def user_login():
    # Can't be logged in to access, the program searches for
    # the user with the username and question and if it can't find one
    # it just redirects and shows an error message

    if current_user.is_authenticated:
        user = User.query.filter_by(
            username=current_user.username).first().to_json()
        return jsonify(user.to_json)
    data = request.get_json()
    username = data['username']
    password = data['password']
    remember = data['remember']
    user = User.query.filter_by(username=username).first()

    if user:
        if user.check_password(password):
            login_user(user=user, remember=remember)
            return jsonify(user.to_json())
    return jsonify({'isAuthenticated': False})


@app.route('/get_day/<date>')
def get_day(date):
    
    date = [int(i) for i in date.split('-')]
    month, day, year = date
    days = Day.query.all()
    print('The date: ', days)
    found_day = None
    for item in days:
        if (item.date.month == month) & (item.date.day == day) & (item.date.year == year):
            found_day = item

            break
    if found_day == None:
        found_day = Day(date=datetime(year, month, day))
        db.session.add(item)
        db.session.commit()
    return jsonify(found_day.to_json())


@app.route('/edit_schedule/<day_id>', methods=['GET', 'POST'])
def edit_schedule(day_id):
    schedule = request.get_json()
    # So we have a list of dictionaries, we just need
    # to convert the list to a bunch of workblocks and
    # add them to either an existing day or create the day
    day = Day.query.filter_by(id=day_id).first()
    # delete all of the workblocks that are there if there are any
    if day.workblocks:
        for wb in day.workblocks:
            db.session.delete(wb)

    # replace them with the ones that just came in
    print('IDK man: ', schedule)
    for item in schedule:
        workblock = WorkBlock(day_id=day_id, user_id=item['user_id'],
                              start_time=item['start_time'], end_time=item['end_time'])
        db.session.add(workblock)
    db.session.commit()

    return jsonify({'success': True})


@app.route('/get_schedule/<day_id>')
def get_schedule(day_id):
    print("dayid: ", day_id)

    def filter(the_list, id):
        for item in the_list:
            if item.id == id:
                the_list.remove(item)
                break
        return the_list

    users = User.query.all()
    not_scheduled = users[:]
    day = Day.query.filter_by(id=day_id).first()
    for workblock in day.workblocks:
        filter(not_scheduled, workblock.user_id)

    return jsonify({'notScheduled': [i.to_json() for i in not_scheduled], 'scheduled': [workblock.to_json() for workblock in day.workblocks], 'allUsers': [user.to_json() for user in users]})


@app.route('/get_week_schedules/<todays_date>')
def get_week_schedules(todays_date):
    date = [int(string) for string in todays_date.split('-')]
    '''So we get the date and with that we first get the schedule set that has that day'''
    dt = datetime(date[2], date[0], date[1])
    day = Day.query.filter(Day.date == dt).first()

    '''If day is found , take that day's weekschedule and create a scheduleset
    if not create a week for that day and return schedule set'''
    week = day.week_schedule if day else create_week(dt)
    schedule_set = complete_schedule_set(week)
    print('Scheduleset: ', schedule_set)
    for item in schedule_set:
        item['schedule'] = item['schedule'].to_json()
    return jsonify(schedule_set)


@app.route('/get_week_schedule/<week_id>')
def get_week_schedule(week_id):
    print('Weekid: ', week_id)
    week = WeekSchedule.query.filter_by(id=week_id).first()
    if week:
        set = complete_schedule_set(week)
        for item in set:
            item['schedule'] = item['schedule'].to_json()
        return(jsonify({'weekSchedule': week.to_json(), 'scheduleSet': set}))
    else:
        return (jsonify({'weekSchedule': None}))


@app.route('/get_day_schedule/<id>')
def get_day_schedule(id):
    ds = Day.query.filter_by(id=id).first()
    if ds:
        return jsonify(ds.to_json())
    else:
        return jsonify(False)


@app.route('/profile_info/<user_id>/<day_id>')
def profile_info(user_id, day_id):

    u = User.query.filter_by(id=user_id).first()
    print('Calendar: ', list(calendar.day_name)[0])
    weekday = Day.query.filter_by(id=day_id).first().date.weekday()
    weekday = list(calendar.day_name)[weekday]
    user = {'firstName': u.first_name, 'lastName': u.last_name,
            'availability': getattr(u.availability, weekday.lower()) if u.availability else 'Free', 'shifts': 'test', 'position': u.position}
    return jsonify(user)


@ login_required
@ app.route('/logout')
def logout():
    logout_user()
    user = {'isAuthenticated': current_user.is_authenticated}
    return jsonify({'currentUser': user})


if "__name__" == "__main__":
    app.debug = True
    app.run(host='192.168.1.227')
