from models import Day, WorkBlock, db, User, WeekSchedule
from flask import jsonify
from dateutil import parser
from datetime import datetime


def get_day(day_id):
    day = Day.query.filter_by(id=day_id).first()
    if day:
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

    return jsonify(False)


def update_day(day_id, workblocks):
    '''
        Delete all of the wbs currently in that day and upload a bunch of
        new ones    
    '''
    day = db.session.get(Day, day_id)
    for item in day.workblocks:
        db.session.delete(item)

    for workblock in workblocks:
        wb = WorkBlock(user=User.query.get(workblock['user']['id']), day=day, start_time=parser.parse(
            workblock['start_time']), end_time=parser.parse(workblock['end_time']))
        db.session.add(wb)

    db.session.commit()

    return jsonify({'message': 'Your schedule has been successfully updated!', 'severity': 'success'})


def get_week(date, id):
    # if weekid is inputted use that
    # if date is inputed use that
    # if nothing, use today's date

    if id:
        week = db.session.get(WeekSchedule, id)
    elif date:
        day = Day.query.filter_by(date=parser.parse(date)).first()
        week = day.week_schedule if day else None

    if week:
        return jsonify(week.to_json())

    return jsonify({'wasSuccessful': False, 'message': 'Week Doesnt Exist...'})


def get_all_weeks():
    # really its a few select weeks
    from datetime import date
    dt = datetime.combine(date.today(), datetime.min.time())

    '''So we get the date and with that we first get the schedule set that has that day'''
    day = Day.query.filter(Day.date == dt).first()

    '''If day is found , take that day's weekschedule and create a scheduleset
    if not create a week for that day and return schedule set'''
    if day:
        week = day.week_schedule if day.week_schedule else WeekSchedule().fill_week(
            dt)
    else:
        week = WeekSchedule().fill_week(dt)
    schedule_set = week.complete_schedule_set()
    return jsonify([schedule.to_json() for schedule in schedule_set])


def add_week(date):
    date = parser.parse(date)
    # first see if it exist

    if not bool(Day.query.filter_by(date=date).first()):
        w = WeekSchedule().fill_week(date)
        return jsonify({'wasSuccessful': True, 'weekSchedule':  w.to_json()})
    return jsonify({'wasSuccessful': False, 'message': 'Week already in db'})
