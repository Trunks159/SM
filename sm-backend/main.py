from flask import render_template, flash, redirect, url_for, request, jsonify
from config import app, db
from werkzeug.urls import url_parse
from forms import RegistrationForm, LoginForm, AddUserForm
from models import User, Day, WorkBlock, Schedule
from flask_login import current_user, login_user, login_required, logout_user
from calendar import month_name, day_name
from dates import viewable_days
from datetime import date
import os

app.jinja_env.globals.update(month_name=month_name, day_name=day_name)


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
    date = data['date']
    values = data['values']
    if Day.query.filter_by(year=date[0], month=date[1], day=date[2]).first() == None:
        day = Day(year=date[0], month=date[1], day=date[2])
        for value in values:
            user = users.filter_by(id=value['id']).first()
            w = WorkBlock(
                user=user, start_time=value['value'][0], end_time=value['value'][1], day=day)
    return jsonify({'data': data})


@app.route('/create_day', methods=['POST'])
def create_day():
    print('REQUEST: ', request.get_json())
    date = request.get_json()
    date = {'month': int(date['month']), 'day': int(
        date['day']), 'year': int(date['year'])}
    db_day = Day.query.filter_by(
        month=date['month'], day=date['day'], year=date['year']).first()
    if db_day:
        db_day.state = 'incomplete'
        print('db day:', db_day)
        return jsonify({'day': db_day.json()})
    else:
        day = Day(month=date['month'], day=date['day'], year=date['year'])
        day.state = 'incomplete'
        db.session.add(day)
        # db.session.commit()
        return jsonify({'day': day.to_json()})


@app.route('/scheduletron5000')
def scheduletron5000():
    today = date.today()
    days = []
    for day in viewable_days(today):
        d = Day.query.filter_by(
            day=day.day, month=day.month, year=day.year).first()
        if d == None:
            d = Day(day=day.day, month=day.month, year=day.year)
            db.session.add(d)
        days.append(d)
    days = [day.to_json() for day in days]
    for day in days:
        if day['day'] == today.day:
            current_day = day
            break

    return jsonify({'current_day': current_day, 'days': days})


@login_required
@app.route('/add_user', methods=['GET', 'POST'])
def add_user():

    # Only managers can access, and it makes a user. Redirects to home,
    # uses same html file as register

    if current_user.position < 1:
        flash('Only managers can access this page')
        return redirect(url_for('home'))
    form = AddUserForm()
    if form.validate_on_submit():
        u = User(first_name=form.first_name.data.lower(),
                 last_name=form.last_name.data.lower())
        u.set_position(form.position.data.lower())
        u.username = (
            form.first_name.data[0].lower() + form.last_name.data.lower())
        db.session.add(u)
        db.session.commit()
        return redirect(url_for('home'))
    return render_template('add_user.html', form=form)


'''
@app.route('/users/<int:id>', methods=['GET', 'POST'])
def edit_user(id):
    user = User.query.get_or_404(id)
    data = request.get_json() or {}
    if 'username' in data and data['username'] != user.username and \
            User.query.filter_by(username=data['username']).first():
        return bad_request('please use a different username')

    return render_template('edit_user.html', user)


'''


@app.route('/register', methods=['GET', 'POST'])
def register():
    data = request.get_json()
    username = data['username']
    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify({'error': 'User Already Exists'})
    else:
        u = User(username=username,
                 first_name=data['first_name'], last_name=data['last_name'])
        u.set_password(data['password'])
        db.session.add(u)
        db.session.commit()
        return jsonify({'success': 'Successfully Created User'})

    # Renders the add_worker template
    # You can't be logged in to access, and when the form submits
    # the user gets made and you're redirected
'''
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = RegistrationForm()
    print(form.errors)
    if form.validate_on_submit():
        u = User(username=form.username.data, first_name=form.first_name.data.lower(),
                 last_name=form.last_name.data.lower())
        u.position = 0 if form.position.data.lower() == 'crew' else 1
        u.set_password(form.password.data)
        db.session.add(u)
        db.session.commit()
        flash('Congrats your registration was successful')
        return redirect(url_for('login'))
    return render_template('add_user.html', form=form)
    '''


@app.route('/user_login', methods=['GET', 'POST'])
def user_login():
    # Can't be logged in to access, the program searches for
    # the user with the username and question and if it can't find one
    # it just redirects and shows an error message

    if current_user.is_authenticated:
        user = User.query.filter_by(
            username=current_user.username).first().to_json()
        return jsonify({'current_user': user})
    '''form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user, remember=form.remember_me.data)
        # if the user was redirected from some page to login, flask sends them to that page
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('home')
        return redirect(next_page)
        '''
    data = request.get_json()
    username = data['username']
    password = data['password']
    remember = data['remember']
    user = User.query.filter_by(username=username).first()
    if user is None or not user.check_password(password):
        user = {'is_authenticated': current_user.is_authenticated}
        return 'success'  # jsonify({'current_user': user})
    login_user(user=user, remember=remember)
    return jsonify({'current_user': user.to_json()})
    # return render_template('login.html', form=form)


@login_required
@app.route('/logout')
def logout():
    logout_user()
    user = {'is_authenticated': current_user.is_authenticated}
    return jsonify({'current_user': user})


@app.route('/user/<username>')
@login_required
def user(username):
    user = User.query.filter_by(username=username).first_or_404()
    return render_template('user.html', user=user)


if "__name__" == "__main__":
    app.debug = True
    app.run()
