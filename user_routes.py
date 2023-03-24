from models import db, User, Availability, RequestOff
from flask import jsonify
from flask_login import current_user


def add_user(data):
    first_name = data['first_name'].lower()
    last_name = data['last_name'].lower()
    position = data['position'].lower()
    # see if a user already has this name is so error of course

    if User.query.filter_by(first_name=first_name, last_name=last_name).first():
        return jsonify('User already exists'), 304
    try:
        u = User(first_name=first_name, last_name=last_name, position=position)
    except AssertionError as msg:
        return jsonify(msg), 400
    db.session.add(u)
    db.session.commit()
    return jsonify(u.to_json())


def get_user(user):

    print('This SHOULD get just the upcoming requests \
          but rn its getting all of them in get user')

    availability = user.availability
    if not availability:
        availability = Availability(user=user)
        db.session.add(availability)
        db.session.commit()
    request_offs = user.request_offs.order_by(RequestOff.start).all()
    request_offs = [req.to_json() for req in request_offs]
    details = {'availability': availability, 'requestOffs': request_offs}
    details.update(user.to_json())
    return jsonify(details)


def get_all_users():
    users = [user.to_json() for user in User.query.all()]
    user = current_user.to_json() if current_user.is_authenticated else {}
    return jsonify({'users': users, 'currentUser': user})


def delete_user(user):
    db.session.delete(user)
    db.session.commit()
    return jsonify('Successfully deleted')


def update_user(user, prop):
    print('Update: ', user)
    if list(prop.keys()) == 'availability':
        user_ava = user.availability.order_by(Availability.weekday).all()
        for i, a in enumerate(user_ava):
            a.start_time = prop['availability'][i]['start_time']
            a.end_time = prop['availability'][i]['end_time']
        db.session.commit()
        return jsonify(user.to_json())
