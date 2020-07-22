from flask import render_template, flash, redirect, url_for, request, jsonify
from config import app, db
from werkzeug.urls import url_parse
from forms import RegistrationForm, LoginForm, AddUserForm
from models import User, Day, WorkBlock
from flask_login import current_user, login_user, login_required, logout_user
from calendar import month_name, day_name
from datetime import date
import os

app.jinja_env.globals.update(month_name=month_name, day_name=day_name)


class Date(date):
    def string_date(self):
        return str(self.year) + '#' + str(self.month) + '#'+str(self.day)

    def to_json(self):
        return {
            'month': self.month,
            'day': self.day,
            'year': self.year
        }


@app.route('/')
@app.route('/home')
def home():
    users = User.query.all()
    img = os.path.abspath('static/images/Logo.png').replace("\\",
                                                            '/').lower().replace('c:', 'http://localhost')
    # json_users = [user.to_json() for user in users]
    # return jsonify({'users': json_users})
    return render_template('home.html', users=users, img=img)


@app.route('/users')
def users():
    users = [user.to_json() for user in User.query.all()]
    return jsonify({'users': users})


@app.route('/receive_data', methods=['POST'])
def receive_data():
    users = User.query
    data = request.get_json()
    date = data['date']
    values = data['values']
    day = Day(year=date[0], month=date[1], day=date[2])

    for value in values:
        user = users.filter_by(id=value['id']).first()
        w = WorkBlock(
            user=user, start_time=value['value'][0], end_time=value['value'][1], day=day)
        print(w.start_time)
    # for item in data:
    #   print('Item: ', item)
    return jsonify({'data': data})


@app.route('/add_schedule')
def add_schedule():
    week = []
    for i in range(1, 8):
        week.append(Date(2020, 3, i))
    return render_template('add_schedule.html', week=week)


@app.route('/schedule/<string_date>')
def schedule(string_date):
    d = string_date.split('#')
    day = Date(int(d[0]), int(d[1]), int(d[2]))
    current_day = jsonify(day.to_json())
    return redirect(url_for('schedule_data'))


@app.route('/logo')
def logo():
    img = os.path.abspath('static/images/Logo.png')
    return jsonify({'img': img})


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

    # Renders the add_worker template
    # You can't be logged in to access, and when the form submits
    # the user gets made and you're redirected

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


@app.route('/login', methods=['GET', 'POST'])
def login():
    # Can't be logged in to access, the program searches for
    # the user with the username and question and if it can't find one
    # it just redirects and shows an error message

    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = LoginForm()
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
    return render_template('login.html', form=form)


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('home'))


@app.route('/user/<username>')
@login_required
def user(username):
    user = User.query.filter_by(username=username).first_or_404()
    return render_template('user.html', user=user)


if "__name__" == "__main__":
    app.debug = True
    app.run()
