from flask import request, jsonify
from config import app, db
from models import User, Week, RequestOff, tz_aware
from flask_login import login_user, login_required, logout_user
from sqlalchemy import func
from route_functions import update_day, get_day, get_week, get_weeks, add_week
from user_routes import add_user, get_user, delete_user, get_all_users
from dateutil import parser


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
    return get_all_users()


@app.route('/api/register', methods=['PUT'])
def register():

    data = request.get_json()
    print(data)
    first_name = data['first_name']
    last_name = data['last_name']

    user = User.query.filter_by(first_name=first_name).filter_by(
        last_name=last_name).first()
    if not user:
        return jsonify('User not found'), 404

    if User.query.filter_by(username=data['username']).first():
        return jsonify('Username already in use.'), 409

    user.username = data['username']
    user.set_password(data['password'])
    db.session.commit()
    return jsonify(user.to_json())


@app.route('/api/login', methods=['POST'])
def login():
    # the program searches for
    # the user with the username in question and if it can't find one
    # it just redirects and shows an error message

    data = request.get_json()
    username = data['username']
    password = data['password']
    remember = data['remember']
    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify('username'), 404

    if user.check_password(password):
        login_user(user=user, remember=remember)
        return jsonify(user.to_json())

    return jsonify('password'), 404


@login_required
@app.route('/api/logout')
def logout():
    logout_user()
    return jsonify('Logout Successful')


@app.route('/api/day/<day_id>', methods=['PUT', 'GET'])
def handle_day(day_id):
    if request.method == 'PUT':
        return update_day(day_id, request.get_json())
    return get_day(day_id)


@app.route('/api/weeks', methods=['GET', 'POST'])
# takes a date and creates or finds a set of schedules
# surrounding that date
def handle_weeks():
    date = request.args.get('date')
    min_date = request.args.get('min-date')
    if request.method == 'POST':
        return add_week(request.get_json())
    if date:
        return get_week(date)
    print('Ran')
    return get_weeks(min_date)


@app.route('/api/weeks/minmax')
def get_minmax():
    max = db.session.query(func.max(Week.monday_date)).first()[0]
    min = db.session.query(func.min(Week.monday_date)).first()[0]
    return jsonify([min.isoformat(), max.isoformat()])


@app.route('/api/requestoffs', methods=['POST'])
def request_offs():

    def logic(request_off):
        user = db.session.get(User, request_off['user_id'])
        start = parser.parse(request_off['start'])
        end = parser.parse(request_off['end'])
        will_add_request = True
        my_requests = user.request_offs.all()
        for request in my_requests:
            if request.is_between(start, end):
                will_add_request = False
                # priotitize extreme values
                start_changed = start < parser.parse(
                    tz_aware(request.start)) or False
                end_changed = end > parser.parse(
                    tz_aware(request.end)) or False
                if start_changed or end_changed:
                    request.start = start
                    request.end = end

        if will_add_request:
            db.session.add(RequestOff(user=user, start=start, end=end))
            db.session.commit()
            return jsonify('Request successfully added!')
        return jsonify('Date conflict with other request'), 400
    return logic(request.get_json())


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, threaded=True)
