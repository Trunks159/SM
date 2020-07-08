import React from "react";

const Week = ({ week }) => (
  <div className="main-flex">
    {week.map((day) => (
      <div className="day">
        <p>{day.weekday}</p>
        <button className="btn">
          <h6>{day.date}</h6>
        </button>
      </div>
    ))}
  </div>
);

export default Week;
