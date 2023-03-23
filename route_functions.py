from models import Day, WorkBlock, db, User, Week
from flask import jsonify
from dateutil import parser
from datetime import datetime, timedelta, date as just_date


def get_day(day_id):
    day = Day.query.filter_by(id=day_id).first()
    if not day:
        return jsonify('Couldnt find the day'), 404

    def filter(the_list, id):
        for item in the_list:
            if item.id == id:
                the_list.remove(item)
                return the_list
    users = User.query.all()
    not_scheduled = users[:]

    for workblock in day.workblocks:
        filter(not_scheduled, workblock.user_id)

    return jsonify({'notScheduled': [i.to_json() for i in not_scheduled], 'scheduled': [workblock.to_json() for workblock in day.workblocks]})


def update_day(day_id, workblocks):
    '''
        Delete all of the wbs currently in that day and upload a bunch of
        new ones    
    '''
    try:

        day = db.session.get(Day, day_id)
        for item in day.workblocks:
            db.session.delete(item)

        for workblock in workblocks:
            wb = WorkBlock(user=User.query.get(workblock['user']['id']), day=day, start_time=parser.parse(
                workblock['start_time']), end_time=parser.parse(workblock['end_time']))
            db.session.add(wb)

        db.session.commit()

        return jsonify('Your schedule has been successfully updated!')

    except:
        return jsonify('Couldnt find day im guessing'), 400


def get_week(date):
    day = Day.query.filter_by(date=parser.parse(date)).first()
    week = day.week if day else None
    if week:
        return jsonify(week.to_json())
    return jsonify('Week not found'), 404


def get_weeks(min_date):
    # really its a few select weeks
    dt = datetime.combine(just_date.today(), datetime.min.time())

    '''So we get the date and with that we first get the schedule set that has that day'''
    day = Day.query.filter(Day.date == dt).first()

    '''If day is found , take that day's weekschedule and create a scheduleset
    if not create a week for that day and return schedule set'''
    if day:
        weeks = Week.query.filter(Week.monday_date >= parser.parse(
            min_date)).order_by(Week.monday_date).all()
        return jsonify([week.to_json() for week in weeks])

    return jsonify('Not found'), 404


def add_week(date):

    date = parser.parse(date)
    # first see if it exist
    day = Day.query.filter_by(date=date).first()
    if not day:
        monday = date - timedelta(days=date.weekday())
        week = Week(monday_date=monday)
        week = fill_week(monday, week)
        return jsonify(week.to_json())
    return jsonify('Week already in db'), 304


def fill_week(monday, week):
    # datetime
    for i in range(7):
        day = Day(date=monday + timedelta(i), week=week)
        db.session.add(day)
    db.session.commit()
    return week
