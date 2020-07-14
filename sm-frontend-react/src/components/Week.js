import React from "react";

const Week = ({ week }) => (
  <div className="box-4">
    {week.map((day) => (
      <div className="day">
        <p>{day.weekday}</p>
        <button id="but" className="btn">
          <h6>{day.date}</h6>
        </button>
      </div>
    ))}
  </div>
);

export default Week;
