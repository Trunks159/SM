from datetime import date, timedelta


def viewable_days(d):
    weekday = d.weekday()
    weeks = []
    for i in range(7):
        if i < weekday:
            td = timedelta(days=weekday - i)
            new_date = d - td
            weeks.append(new_date)
        elif i == weekday:
            weeks.append(d)
        elif i > weekday:
            td = timedelta(days=abs(weekday-i))
            new_date = d + td
            weeks.append(new_date)

    last_day = weeks[len(weeks)-1]
    for i in range(1, 15):
        new_date = last_day + timedelta(days=i)
        weeks.append(new_date)
    return weeks
