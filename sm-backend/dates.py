from datetime import date, timedelta

'''
class A():
    a = 'bob'


class B(A):
    def __init__(self, doobie, **kwargs):
        super(B, self).__init__(**kwargs)
        self.b = doobie.year


x = B(date(month=2, day=22, year=1996))


'''


class Date(date):
    state = 'available'
    colors = {'available': 'blue', 'complete': 'green',
              'incomplete': 'red', 'inactive': 'gray'}

    def color(self):
        return self.colors[self.state]

    def weeks(self):
        weekday = self.weekday()
        weeks = []
        for i in range(7):
            if i < weekday:
                td = timedelta(days=weekday - i)
                new_date = self - td
                weeks.append(
                    Date(year=new_date.year, month=new_date.month, day=new_date.day))
            elif i == weekday:
                weeks.append(self)
            elif i > weekday:
                td = timedelta(days=abs(weekday-i))
                new_date = self + td
                weeks.append(
                    Date(year=new_date.year, month=new_date.month, day=new_date.day))

        last_day = weeks[len(weeks)-1]
        for i in range(14):
            new_date = last_day + timedelta(days=i)
            weeks.append(
                Date(year=new_date.year, month=new_date.month, day=new_date.day))
        return weeks
