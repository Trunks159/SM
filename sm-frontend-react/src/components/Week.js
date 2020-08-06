import React from "react";
import { Link } from "react-router-dom";

const Week = ({ week, dictionary }) => {
  const circle = "45px";
  return (
    <div className="week">
      <h4>Edit Schedule</h4>
      {week.map(({ day, month, year, weekday, color, date }) => (
        <div key={day} className="day">
          <p>{dictionary[weekday.toString()]}</p>
          <Link to={`/day/${date}`}>
            <button
              id="but"
              className="circle"
              style={{ height: circle, width: circle, backgroundColor: color }}
            >
              {day}
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Week;
