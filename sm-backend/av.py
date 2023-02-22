from time import strptime
from datetime import timedelta
from models import
# strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())

# def available(time, user_id, weekday):


def to_seconds(time):

    # time in 00:00 format to seconds
    time = strptime(time, '%H:%M')
    return timedelta(hours=time.tm_hour, minutes=time.tm_min).total_seconds()


def available(time='17:20'):
    weekdays = ['monday', 'tuesday', 'wednesday', 'thursday',
         'friday', 'saturday', 'sunday']

     restriction = getattr(user_av, weekdays[weekday])
     times = restriction.split('-')'''
    user_av = User.query.filter_by(id = user_id).availability
    restriction = '16:00-23:00'.split('-')
    start = to_seconds(restriction[0])
    end = to_seconds(restriction[1])
    time = to_seconds(time)
    if time > end:
        return 'User is only available before 11PM'
    elif time < start:
        return 'User is only available after 4PM'
    else:
        return True
