import React from "react";
import { Link } from "react-router-dom";

const Week = ({ week, dictionary, changeCurrentDay }) => {
  const color_dictionary = {
    green: "#39FF14",
    red: "red",
    blue: "#0d84a7",
    gray: "gray",
  };
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
              height: "45px",
              width: "45px",
              backgroundColor: color_dictionary[day.color],
            }}
            onClick={() => changeCurrentDay(day)}
            to={`/day/${day.month}/${day.day}/${day.year}`}
          >
            {day.day}
          </Link>
        </div>
      ))}
      <button>Wipe DB Days</button>
    </div>
  );
};

export default Week;
