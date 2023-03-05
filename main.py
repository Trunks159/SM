from flask import request, jsonify
from config import app, db
from models import User, Day, Availability, WeekSchedule, WorkBlock
from flask_login import current_user, login_user, login_required, logout_user
from datetime import datetime, timedelta
from dateutil import parser
from sqlalchemy import func


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


@app.route('/')
def serve():
    return app.send_static_file('index.html')


@app.route('/api/get_all_users')
def users():
    users = [user.to_json() for user in User.query.all()]
    user = current_user.to_json() if current_user.is_authenticated else {}
    return jsonify({'users': users, 'currentUser': user})


@app.route('/api/register', methods=['GET', 'POST'])
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


@app.route('/api/login_user', methods=['GET', 'POST'])
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


@app.route('/api/add_team_member', methods=['GET', 'POST'])
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


@app.route('/api/get_schedule/<day_id>')
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


@app.route('/api/get_week_schedules')
# takes a date and creates or finds a set of schedules
# surrounding that date
def get_week_schedules():
    from datetime import date
    the_date = request.args.get('date')
    if the_date:
        the_date = [int(string) for string in the_date.split('-')]
        dt = datetime(the_date[2], the_date[0], the_date[1])
    else:
        # use today's date
        dt = datetime.combine(date.today(), datetime.min.time())

    '''So we get the date and with that we first get the schedule set that has that day'''
    day = Day.query.filter(Day.date == dt).first()

    '''If day is found , take that day's weekschedule and create a scheduleset
    if not create a week for that day and return schedule set'''
    if day:
        week = day.week_schedule if day.week_schedule else WeekSchedule().initialize(dt)
    else:
        week = WeekSchedule().initialize(dt)
    schedule_set = week.complete_schedule_set()
    return jsonify([schedule.to_json() for schedule in schedule_set])


@app.route('/api/create_week_schedule', methods=['POST'])
def create_week_schedule():
    date = request.get_json()
    date = parser.parse(date)
    # first see if it exist

    if not bool(Day.query.filter_by(date=date).first()):
        w = WeekSchedule().initialize(date)
        db.session.add(w)
        db.session.commit()
        return jsonify({'weekSchedule':  w.to_json()})
    return jsonify({'message': 'Week already in db'})


@app.route('/api/test')
def test():
    for w in WeekSchedule.query.all():
        for day in w.week:
            for workblock in day.workblocks:
                db.session.delete(workblock)
            db.session.delete(day)
        db.session.delete(w)
    # db.session.commit()
    return True


@app.route('/api/get_week_schedule')
def get_week_schedule():
    # if weekid is inputed use that
    # if date is inputed use that
    # if nothing, use today's date

    week_id = request.args.get('week-id')
    date = request.args.get('date')
    if week_id:
        print('Weekid: ', week_id)
        week = WeekSchedule.query.filter_by(id=week_id).first()
    elif date:
        day = Day.query.filter_by(date=parser.parse(date)).first()
        week = day.week_schedule if day else None
        # could probably write a more complex sql query to be more efficient
    else:
        from datetime import date as the_date
        dt = datetime.combine(the_date.today(), datetime.min.time())

        # if the day isnt monday, make it monda. dt.weekday() returns 0
        # if its a monday which is falsy
        this_monday = (dt - timedelta(days=dt.weekday())
                       ) if dt.weekday() else dt

        week = WeekSchedule.query.filter(
            WeekSchedule.monday_date == this_monday).first()

    if week:
        return jsonify(week.to_json())
    else:
        return (jsonify('Week Doesnt Exist...'))


@app.route('/api/get_day_schedule/<id>')
def get_day_schedule(id):
    ds = Day.query.filter_by(id=id).first()
    if ds:
        return jsonify(ds.to_json())
    else:
        return jsonify(False)


@app.route('/api/update_schedule', methods=['POST'])
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


@app.route('/api/team_member_details/<id>')
def team_member_details(id):
    user = User.query.filter_by(id=id).first()
    if (user):
        # this SHOULD get just the upcoming requests but rn its getting all of them
        details = {'availability': user.get_availability(
        ).to_json(), 'requestOffs': user.get_request_offs_json()}
        details.update(user.to_json())
        return jsonify({'wasSuccessful': True, 'user': details})
    return jsonify({'wasSuccessful': False, 'message': 'There is no user with that id...'})


@app.route('/api/update_user', methods=['POST'])
def update_user():
    return jsonify(None)


@ login_required
@ app.route('/api/logout')
def logout():
    logout_user()
    user = {'isAuthenticated': current_user.is_authenticated}
    return jsonify({'currentUser': user})


@app.route('/api/get_minmax_of_all_weeks')
def get_minmax():
    max = db.session.query(func.max(WeekSchedule.monday_date)).first()[0]
    min = db.session.query(func.min(WeekSchedule.monday_date)).first()[0]

    return jsonify([min.isoformat(' '), max.isoformat(' ')])


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, threaded=True)
