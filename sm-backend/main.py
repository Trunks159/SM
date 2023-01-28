import calendar
from flask import request, jsonify
from config import app, db
from models import User, Day, Availability, WeekSchedule, WorkBlock
from flask_login import current_user, login_user, login_required, logout_user
from datetime import datetime
from dates import complete_schedule_set
from dateutil import parser


@app.route('/get_all_users')
def users():
    users = [user.to_json() for user in User.query.all()]
    user = current_user.to_json() if current_user.is_authenticated else {}
    return jsonify({'users': users, 'currentUser': user})


@app.route('/register', methods=['GET', 'POST'])
def register():

    data = request.get_json()
    user = User.query.filter_by(first_name=data['first_name']).filter_by(
        last_name=data['last_name']).first()
    if user:
        if User.query.filter_by(username=data['username']).first():
            return jsonify({'wasSuccessful': False, 'message': 'Username Already In Use'})
        else:
            user.username = data['username']
            user.set_password(data['password'])
            db.session.commit()
            return jsonify({'wasSuccessful': True})
    else:
        return jsonify({'wasSuccessful': False,  'message': 'User Not Found'})


@app.route('/login_user', methods=['GET', 'POST'])
def user_login():
    # the program searches for
    # the user with the username in question and if it can't find one
    # it just redirects and shows an error message

    data = request.get_json()
    username = data['username']
    password = data['password']
    remember = data['remember']
    user = User.query.filter_by(username=username).first()

    if user:
        if user.check_password(password):
            login_user(user=user, remember=remember)
            return jsonify({'wasSuccessful': True, 'currentUser': user.to_json()})
        else:
            return jsonify({'wasSuccessful': False, 'errorType':  'password'})
    return jsonify({'wasSuccessful': False, 'errorType':  'username'})


@app.route('/add_team_member', methods=['GET', 'POST'])
def add_team_member():
    data = request.get_json()
    first_name = data['first_name']
    last_name = data['last_name']
    position = data['position']
    # see if a user already has this name is so error of course
    if User.query.filter_by(first_name=first_name, last_name=last_name).first():
        return jsonify({'wasSuccessful': False, 'message': 'User already exists.'})
    else:
        u = User(first_name=first_name, last_name=last_name, position=position)
        db.session.add(u)
        db.session.commit()
        return jsonify({'wasSuccessful': True, 'message': 'Team member was successfully added!'})


@app.route('/get_schedule/<day_id>')
def get_schedule(day_id):
    day = Day.query.filter_by(id=day_id).first()
    if day:

        def filter(the_list, id):
            for item in the_list:
                if item.id == id:
                    the_list.remove(item)
                    break
            return the_list

        users = User.query.all()
        not_scheduled = users[:]

        for workblock in day.workblocks:
            filter(not_scheduled, workblock.user_id)

        return jsonify({'notScheduled': [i.to_json() for i in not_scheduled], 'scheduled': [workblock.to_json() for workblock in day.workblocks]})
    else:
        return jsonify(False)


@app.route('/get_week_schedules/<todays_date>')
# takes a date and creates or finds a set of schedules
# surrounding that date
def get_week_schedules(todays_date):
    date = [int(string) for string in todays_date.split('-')]
    '''So we get the date and with that we first get the schedule set that has that day'''
    dt = datetime(date[2], date[0], date[1])
    day = Day.query.filter(Day.date == dt).first()

    '''If day is found , take that day's weekschedule and create a scheduleset
    if not create a week for that day and return schedule set'''
    if day:
        week = day.week_schedule if day.week_schedule else WeekSchedule().initialize(dt)
    else:
        week = WeekSchedule().initialize(dt)
    schedule_set = complete_schedule_set(week)
    for item in schedule_set:
        item['schedule'] = item['schedule'].to_json()
    return jsonify(schedule_set)


@app.route('/get_week_schedule')
def get_week_schedule():

    def find_week_schedule(date):
        # take a date and get the weekschedule associated with
        # that date
        wss = WeekSchedule.query.all()
        for ws in wss:
            if ws.has_date(date):
                return ws
                break
        return False

    week_id = request.args.get('week-id')
    date = request.args.get('date')
    if week_id:
        week = WeekSchedule.query.filter_by(id=week_id).first()
    elif date:
        date = [int(i) for i in date.split('-')]
        date = datetime(date[2], date[0], date[1])
        week = find_week_schedule(date)

    if week:
        return jsonify(week.to_json())
    else:
        return (jsonify(None))


@app.route('/get_day_schedule/<id>')
def get_day_schedule(id):
    ds = Day.query.filter_by(id=id).first()
    if ds:
        return jsonify(ds.to_json())
    else:
        return jsonify(False)


@app.route('/update_schedule', methods=['POST'])
def update_schedule():
    day_info = request.get_json()
    '''
        Delete all of the wbs currently in that day and upload a bunch of
        new ones    
    '''
    day = Day.query.get(day_info['day_id'])
    for item in day.workblocks:
        db.session.delete(item)

    for workblock in day_info['workblocks']:
        wb = WorkBlock(user=User.query.get(workblock['user']['id']), day=day, start_time=parser.parse(
            workblock['start_time']), end_time=parser.parse(workblock['end_time']))
        db.session.add(wb)

    db.session.commit()

    return jsonify({'message': 'Your schedule has been successfully updated!', 'severity': 'success'})


@app.route('/team_member_details/<id>')
def team_member_details(id):
    user = User.query.filter_by(id=id).first()
    if (user):
        # this SHOULD get just the upcoming requests but rn its getting all of them
        details = {'availability': user.availability.to_json(), 'requestOffs': [
            request_off.to_json() for request_off in user.request_offs]}.update(user.to_json())
        return jsonify({'wasSuccessful': True, 'user': details})
    return jsonify({'wasSuccessful': False, 'message': 'There is no user with that id...'})


@ login_required
@ app.route('/logout')
def logout():
    logout_user()
    user = {'isAuthenticated': current_user.is_authenticated}
    return jsonify({'currentUser': user})


if "__name__" == "__main__":
    app.debug = True
    app.run(host='192.168.1.227')
