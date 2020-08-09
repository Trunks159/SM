import React from "react";
import { Link } from "react-router-dom";

const Week = ({ week, dictionary }) => {
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
            to={`/day/${day.date.month}/${day.date.day}/${day.date.year}`}
          >
            {day.day}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Week;
