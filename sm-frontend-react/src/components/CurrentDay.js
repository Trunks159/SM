import React from "react";

const CurrentDay = ({ day, dictionary }) => {
  return (
    <div className="current-day">
      {day && <p>{dictionary[day.weekday]}</p>}
      <p></p>
    </div>
  );
};
export default CurrentDay;
