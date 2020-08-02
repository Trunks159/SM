import React from "react";

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
];

const Week = () => (
  <div className="box-4">
    {week.map((day) => (
      <div className="day" key={day.date}>
        <p>{day.weekday}</p>
        <button id="but" className="btn">
          <h6>{day.date}</h6>
        </button>
      </div>
    ))}
  </div>
);

export default Week;
