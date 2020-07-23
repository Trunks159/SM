from datetime import date, timedelta


class Date():
    state = 'available'
    color = '#008000'

    def convert(self, d):
        self.year = d.year
        self.month = d.month
        self.day = d.day

    def weeks(self):
        weekday = self.weekday()
        weeks = []
        for i in range(7):
            if i < weekday:
                td = timedelta(days=weekday - i)

                weeks.append(self - td)
            elif i == weekday:
                weeks.append(self)
            elif i > weekday:
                td = timedelta(days=abs(weekday-i))
                weeks.append(Date(self + td))
        last_day = weeks[len(weeks)-1]
        for i in range(14):
            weeks.append(last_day + Date(timedelta(days=i)))
        return weeks
