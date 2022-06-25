import React, { Component } from "react";

const getTimeLabels = (shiftFilter) => {
  const { day, night } = shiftFilter;
  const labels = {
    both: ["6am", "10:30am", "3pm", "7:30pm", "12am"],
    day: ["6am", "10:30am", "3pm"],
    night: ["3pm", "7:30pm", "12am"],
  };
  if (day && night) {
    return labels.both;
  } else if (day) {
    return labels.day;
  }
  return labels.night;
};

const TimeLine = ({ shiftFilter }) => {
  const timeLabels = getTimeLabels(shiftFilter);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 0,
        }}
      >
        {timeLabels.map((time, index) => (
          <p
            style={{
              textTransform: "uppercase",
              color: "#888888",
              fontSize: index % 2 !== 0 ? ".75rem" : "1rem",
              marginTop: index % 2 !== 0 ? "auto" : 0,
            }}
          >
            {time}
          </p>
        ))}
      </div>
      <svg height={10}>
        <line
          style={{ margin: "0px 100px" }}
          x1={0}
          y1={0}
          x2={"100%"}
          y2={0}
          stroke="#C1C1C1"
        />
      </svg>
    </div>
  );
};

export default TimeLine;
