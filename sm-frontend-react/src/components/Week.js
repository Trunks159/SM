import React from "react";
import { Link } from "react-router-dom";

const Week = ({ week, dictionary }) => {
  /*
  const week = [
    {
      weekday: "Tues.",
      date: "Nov 4",
    },
    {
      weekday: "Wed.",
      date: "Nov 5",
    },
    {
      weekday: "Thurs.",
      date: "Nov 6",
    },
    {
      weekday: "Fri.",
      date: "Nov 7",
    },
    {
      weekday: "Sat.",
      date: "Nov 8",
    },
    {
      weekday: "Sun.",
      date: "Nov 9",
    },
  ];*/

  const circle = "45px";
  console.log(week);
  return (
    <div className="week">
      <h4>Edit Schedule</h4>
      {week.map(({ day, month, year, weekday, color }) => (
        <div key={day} className="day">
          <p>{dictionary[weekday.toString()]}</p>
          <Link to={`/day/${day.date}`}>
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
