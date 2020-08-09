from datetime import date, timedelta


class Date(date):
    state = 'available'

    def to_json(self):
        return{
            'color': self.color(),
            'state': self.state,
            'year': self.year,
            'month': self.month,
            'day': self.day,
            'weekday': self.weekday(),
            'date': {'month': self.month, 'day': self.day, 'year': self.year}
        }

    def color(self):
        return {'available': 'blue', 'complete': 'green',
                'incomplete': 'red', 'inactive': 'gray', '': 'orange'}[self.state]

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
        for i in range(1, 15):
            new_date = last_day + timedelta(days=i)
            weeks.append(
                Date(year=new_date.year, month=new_date.month, day=new_date.day))
        return weeks
