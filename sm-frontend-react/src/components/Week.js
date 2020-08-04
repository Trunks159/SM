import React from "react";

const Week = () => {
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
  const circle = "45px";
  return (
    <div className="week">
      {week.map((day) => (
        <div className="week" key={day.date}>
          <p>{day.weekday}</p>
          <button
            id="but"
            className="circle"
            style={{ height: circle, width: circle }}
          >
            {day.date}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Week;
