from models import db, User, Availability, RequestOff
from flask import jsonify


def add_user(data):
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
        return jsonify({'wasSuccessful': True, 'message': 'Team member was successfully added!', 'newUser': u.to_json()})


def get_user(id):

    user = db.session.get(User, id)
    if (user):
        # this SHOULD get just the upcoming requests but rn its getting all of them
        availability = user.availability
        if not availability:
            availability = Availability(user=user)
            db.session.add(availability)
            db.session.commit()
        request_offs = user.request_offs.order_by(RequestOff.start).all()
        request_offs = [req.to_json() for req in request_offs]
        details = {'availability': availability, 'requestOffs': request_offs}
        details.update(user.to_json())
        return jsonify({'wasSuccessful': True, 'user': details})
    return jsonify({'wasSuccessful': False, 'message': 'There is no user with that id...'})


def delete_user(id):
    if id:
        u = User.query.get(id)
        if u:
            db.session.delete(u)
            db.session.commit()
            return jsonify({'wasSuccessful': True})
    return jsonify({'wasSuccessful': True, 'message': "Couldn't find the user you're trying to delete..."})
