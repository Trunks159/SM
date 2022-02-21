from flask import request, jsonify
from config import app, db
from models import User, Day, WorkBlock, Availability
from flask_login import current_user, login_user, login_required, logout_user
from datetime import datetime, timedelta


@app.route('/')
@app.route('/home')
def home():
    return 'Hello World'


@app.route('/users')
def users():
    users = [user.to_json() for user in User.query.all()]
    user = current_user.to_json() if current_user.is_authenticated else {
        'is_authenticated': False}
    return jsonify({'users': users, 'currentUser': user})


@app.route('/edit_availability', methods=['POST'])
def edit_availability():

    days = request.get_json()['days']
    username = request.get_json()['username']
    user = User.query.filter_by(username=username).first()
    if user:
        if user.availability == []:
            a = Availability(user=user)
        a = user.availability[0]
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


@app.route('/register', methods=['GET', 'POST'])
def register():
    data = request.get_json()
    user = User.query.filter_by(first_name=data['first_name']).filter_by(
        last_name=data['last_name']).first()
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
            return jsonify({'current_user': user.to_json()})
    return jsonify({'isAuthenticated': False})


@app.route('/get_day/<date>')
def get_day(date):
    date = [int(i) for i in date.split('-')]
    month, day, year = date
    days = Day.query.all()
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
    # So we have a list of dictionaries, we just need
    # to convert the list to a bunch of workblocks and
    # add them to either an existing day or create the day
    users = [user.to_json() for user in User.query.all()]
    day = Day.query.filter_by(id=day_id).first()
    schedule = [workblock.to_json() for workblock in day.workblocks]
    for wb in schedule:
        user = User.query.filter_by(id=wb['userId']).first()
        wb['firstName'] = user.first_name
        wb['position'] = user.position
        for u in users:
            if u['id'] == user.id:
                users.remove(u)

    return jsonify({'notScheduled': users, 'scheduled': schedule})


@app.route('/profile_info/<user_id>/<weekday>')
def profile_info(user_id, weekday):

    u = User.query.filter_by(id=user_id).first()
    user = {'firstName': u.first_name, 'lastName': u.last_name,
            'availability': getattr(u.availability[0], weekday.lower()) if u.availability else 'Free', 'shifts': 'test'}
    return jsonify(user)


@ login_required
@ app.route('/logout')
def logout():
    logout_user()
    user = {'is_authenticated': current_user.is_authenticated}
    return jsonify({'currentUser': user})


if "__name__" == "__main__":
    app.debug = True
    app.run(host='192.168.1.227')
