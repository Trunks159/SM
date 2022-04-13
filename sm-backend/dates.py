from datetime import timedelta, datetime
from models import WeekSchedule, Day, db

'''
takes a datetime object and creates a week of Day objects
linked to a weekschedule  in the db
'''


def create_week(date):
    monday = date - timedelta(date.weekday())
    week = []
    ws = WeekSchedule(monday_date=monday)
    for i in range(7):
        day = Day(date=monday + timedelta(i), week_schedule=ws)
        db.session.add(day)
        week.append(day)
    db.session.add(ws)
    # db.session.commit()
    '''returns weekSchedule instead of list of days in week'''
    return ws


def complete_schedule_set(week):
    schedule_set = [{week}]
    '''
    takes a week and returns the weeks surrounding it if they exist of course'''
    next_weeks = WeekSchedule.query.filter(
        WeekSchedule.monday_date > week.monday_date).all()
    for schedule in next_weeks:
        schedule_set.append(schedule)
    last_week = WeekSchedule.query.filter(
        WeekSchedule.monday_date == week.monday_date - timedelta(days=7)).first()
    two_weeks_ago = WeekSchedule.query.filter(
        WeekSchedule.monday_date == week.monday_date - timedelta(days=14)).first()
    if last_week:
        schedule_set.append({'last week' : last_week})
    if two_weeks_ago:
        schedule_set.append({'two weeks ago': two_weeks_ago})
    return sorted(schedule_set, key=lambda x: x.monday_date)



def fake():
    d = datetime(2021, 9, 6)
    week = create_week(d)
    d = datetime(2021, 9,20)
    create_week(d)
    return complete_schedule_set(week)
