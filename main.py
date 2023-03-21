from flask import request, jsonify
from config import app, db
from models import User, WeekSchedule
from flask_login import current_user, login_user, login_required, logout_user
from sqlalchemy import func
from route_functions import update_day, get_day, get_week, get_all_weeks, add_week
from user_routes import add_user, get_user, delete_user


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


@app.route('/')
def serve():
    return app.send_static_file('index.html')


@app.route('/api/users', methods=['GET', 'POST', 'DELETE'])
def users():
    if request.method == 'POST':
        return add_user(request.get_json())
    id = request.args.get('id')
    if request.method == 'DELETE':
        return delete_user(id)
    if id:
        return get_user(id)
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


@app.route('/api/login', methods=['POST'])
def login():
    # the program searches for
    # the user with the username in question and if it can't find one
    # it just redirects and shows an error message

    data = request.get_json()
    username = data['username'].strip()
    password = data['password'].strip()
    remember = data['remember']
    user = User.query.filter_by(username=username).first()

    if user:
        if user.check_password(password):
            login_user(user=user, remember=remember)
            return jsonify({'wasSuccessful': True, 'currentUser': user.to_json()})
        else:
            return jsonify({'wasSuccessful': False, 'errorType':  'password'})
    return jsonify({'wasSuccessful': False, 'errorType':  'username'})


@ login_required
@ app.route('/api/logout')
def logout():
    logout_user()
    user = {'isAuthenticated': current_user.is_authenticated}
    return jsonify({'currentUser': user})


@app.route('/api/day/<day_id>', methods=['PUT', 'GET'])
def handle_day(day_id):
    if request.method == 'PUT':
        return update_day(day_id, request.get_json())
    return get_day(day_id)


@app.route('/api/weeks', methods=['GET', 'POST'])
# takes a date and creates or finds a set of schedules
# surrounding that date
def handle_weeks():
    d = request.args.get('date')
    id = request.args.get('week-id')
    if request.method == 'POST':
        return add_week(request.get_json())
    if d or id:
        return get_week(d, id)
    return get_all_weeks()


@app.route('/api/weeks/minmax')
def get_minmax():
    max = db.session.query(func.max(WeekSchedule.monday_date)).first()[0]
    min = db.session.query(func.min(WeekSchedule.monday_date)).first()[0]
    return jsonify([min.isoformat(' '), max.isoformat(' ')])


@app.route('/api/requestoffs', methods=['POST'])
def request_offs():
    request_off = request.get_json()
    u = db.session.get(User, request_off['user_id'])
    message = u.add_request_off(request_off['start'], request_off['end'])
    return jsonify(message)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, threaded=True)
