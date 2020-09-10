import React from "react";
import { Link } from "react-router-dom";

const Week = ({ days, dictionary, reqDay, wipeDays }) => {
  const color_dictionary = {
    green: "#39FF14",
    red: "red",
    blue: "#0d84a7",
    gray: "gray",
  };

  return (
    <div className="week">
      <h4>Edit Schedule</h4>
      {days.map((day) => (
        <div key={day.day} className="day">
          <p>{dictionary[day.weekday.toString()]}</p>
          <Link
            id="but"
            className="circle"
            style={{
              height: "45px",
              width: "45px",
              backgroundColor: color_dictionary[day.color],
            }}
            onClick={() => reqDay(day)}
            to={`/day/${day.month}${day.day}${day.year}`}
          >
            {day.day}
          </Link>
        </div>
      ))}
      <button onClick={wipeDays}>Wipe DB Days</button>
    </div>
  );
};

export default Week;
