from datetime import timedelta, datetime
from models import WeekSchedule, Day, db
import inflect

'''
takes a datetime object and creates a week of Day objects
linked to a weekschedule  in the db
'''





def complete_schedule_set(week):
    schedule_set = [week]
    '''
    takes a week and returns the weeks surrounding it if they exist of course'''
    next_weeks = WeekSchedule.query.filter(
        WeekSchedule.monday_date > week.monday_date).order_by(WeekSchedule.monday_date.asc()).all()
    if next_weeks:
        for schedule in next_weeks:
            schedule_set.append(schedule)

    last_week = WeekSchedule.query.filter(
        WeekSchedule.monday_date == week.monday_date - timedelta(days=7)).first()
    two_weeks_ago = WeekSchedule.query.filter(
        WeekSchedule.monday_date == week.monday_date - timedelta(days=14)).first()
    if last_week:
        schedule_set.append(last_week)
    if two_weeks_ago:
        schedule_set.append(two_weeks_ago)

    sorted_set = sorted(schedule_set, key=lambda x: x.monday_date)
    return with_added_labels(sorted_set, week)


def with_added_labels(schedule_set, this_week):
    '''Add labels like : 'this week' and such to the sets'''
    finished_set = []
    p = inflect.engine()
    for schedule in schedule_set:
        difference = int(
            (schedule.monday_date - this_week.monday_date).days / 7)
        if difference < 0:
            word = 'last week' if difference == - \
                1 else '{} weeks ago'.format(p.number_to_words(abs(difference)/7))
        elif difference == 0:
            word = 'this week'
        else:
            word = 'next week' if difference == 1 else '{} weeks from now'.format(
                p.number_to_words(difference))
        finished_set.append({'timeFrame': word, 'schedule': schedule})
    return finished_set


