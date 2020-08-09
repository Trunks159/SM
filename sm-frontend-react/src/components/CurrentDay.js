import React from "react";

const CurrentDay = ({ day, dictionary }) => {
  return <p className="current-day">{day && dictionary[day.weekday]}</p>;
};
export default CurrentDay;
