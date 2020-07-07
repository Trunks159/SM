import React from "react";

const Week = ({ week }) =>
  week.map((day) => (
    <div>
      <p>{day.weekday}</p>
      <button className="btn">
        <p>{day.date}</p>
      </button>
    </div>
  ));

export default Week;
