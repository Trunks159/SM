from flask import json, request, jsonify
from config import app, db
from werkzeug.urls import url_parse
from models import User, Day, WorkBlock, Availability
from flask_login import current_user, login_user, login_required, logout_user
from dates import viewable_days
from datetime import datetime
import os


@app.route('/')
@app.route('/home')
def home():
    users = User.query.all()

    img = os.path.abspath('static/images/Logo.png').replace("\\",
                                                            '/').lower().replace('c:', 'http://localhost')
    # json_users = [user.to_json() for user in users]
    # return jsonify({'users': json_users})
    return 'Hello World'  # render_template('home.html', users=users, img=img)


@app.route('/users')
def users():
    users = [user.to_json() for user in User.query.all()]
    user = current_user
    if user.is_authenticated:
        user = user.to_json()
    else:
        user = {'is_authenticated': False}

    return jsonify({'users': users, 'current_user': user})


@login_required
@app.route('/receive_data', methods=['POST'])
def receive_data():
    users = User.query
    data = request.get_json()
    workblocks = data['workblocks']
    print('HERE ARE THE WORKBLOCKS:', workblocks)
    day_id = data['day_id']
    day = Day.query.filter_by(id=day_id).first()
    for wb in day.workblocks:
        db.session.delete(wb)
    for workblock in workblocks:
        user = users.filter_by(id=workblock['user_id']).first()
        w = WorkBlock(
            user=user, start_time=workblock['start_time'], end_time=workblock['end_time'])
        db.session.add(w)
    db.session.commit()
    return jsonify({'data': data})


@app.route('/access_day', methods=['POST'])
def access_day():

    day_date = request.get_json()
    day_date = datetime(day_date['year'], day_date['month'], day_date['day'])
    db_day = Day.query.filter_by(date=day_date).first()

    if db_day:
        db_day.state = 'incomplete'
        db.session.commit()
        return jsonify({'day': db_day.to_json()})
    else:
        day = Day(date=datetime(
            day_date['year'], day_date['month'], day_date['day']))
        day.state = 'incomplete'
        db.session.add(day)
        db.session.commit()
        return jsonify({'day': day.to_json()})


@app.route('/edit_availability', methods=['POST'])
def edit_availability():

    days = request.get_json()['days']
    username = request.get_json()['username']
    user = User.query.filter_by(username=username).first()
    print('Day info: ', days)
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


@app.route('/get_days')
def get_days():
    '''
5/3/21 Made untested changes here this may give you problems!!!

    '''
    # makes a today date, and goes and makes the days for the next two weeks
    # for each day if its in the db, grab that day, else make the day and add it to the
    # db, finally return all the days as jsons
    today = datetime.today()
    today = datetime(today.year, today.month, today.day)
    days = []
    for day in viewable_days(today):
        d = Day.query.filter_by(
            date=day).first()
        if d == None:
            print('Couldnt find any days like that')
            d = Day(date=day)
            db.session.add(d)
        days.append(d)
    db.session.commit()
    days = [day.to_json() for day in days]
    return jsonify({'days': days})


@app.route('/wipe_days')
def wipe_days():
    for day in Day.query.all():
        db.session.delete(day)
    for wb in WorkBlock.query.all():
        db.session.delete(wb)
    db.session.commit()
    return jsonify({'success': True})


@login_required
@app.route('/add_user', methods=['GET', 'POST'])
def add_user():
    # Only managers can access, and it makes a user. Redirects to home
    if current_user.position == 'manager':
        user = request.get_json()
        print('The user we got is: ', user)
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

    # Renders the add_worker template
    # You can't be logged in to access, and when the form submits
    # the user gets made and you're redirected


@app.route('/user_login', methods=['GET', 'POST'])
def user_login():
    # Can't be logged in to access, the program searches for
    # the user with the username and question and if it can't find one
    # it just redirects and shows an error message

    if current_user.is_authenticated:
        user = User.query.filter_by(
            username=current_user.username).first().to_json()
        return jsonify({'current_user': user})
    data = request.get_json()
    username = data['username']
    password = data['password']
    remember = data['remember']
    user = User.query.filter_by(username=username).first()
    if user:
        if user.check_password(password):
            login_user(user=user, remember=remember)
            return jsonify({'current_user': user.to_json()})
    return jsonify({'current_user': {'is_authenticated': False}})


@login_required
@app.route('/logout')
def logout():
    logout_user()
    user = {'is_authenticated': current_user.is_authenticated}
    return jsonify({'current_user': user})


if "__name__" == "__main__":
    app.debug = True
    app.run()
