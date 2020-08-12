import React, { Component } from "react";
import { Link } from "react-router-dom";

class Week extends Component {
  render() {
    const { week, dictionary, changeCurrentDay } = this.props;
    const circle = "45px";
    return (
      <div className="week">
        <h4>Edit Schedule</h4>
        {week.map((day) => (
          <div key={day.day} className="day">
            <p>{dictionary[day.weekday.toString()]}</p>
            <Link
              id="but"
              className="circle"
              style={{
                height: circle,
                width: circle,
                backgroundColor: day.color,
              }}
              onClick={() => changeCurrentDay(day)}
              to={`/day/${day.month}/${day.day}/${day.year}`}
            >
              {day.day}
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default Week;
