import { Divider } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

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
  const screenWidth = useSelector((state) => state.screenWidth);
  return (
    <div className="timeline">
      <div className="timeline-labels">
        {timeLabels.map((time, index) => (
          <p
            key={index}
            style={{
              fontSize: index % 2 !== 0 ? "6px" : "10px",
              //marginTop: index % 2 !== 0 ? "auto" : 0,
            }}
          >
            {time}
          </p>
        ))}
      </div>
      <Divider
        style={{
          background: "black",
          width: 1,
          margin: 5,
          opacity: 0.5,
        }}
        orientation={screenWidth >= 600 ? "horizontal" : "vertical"}
        className={"timeline-divider"}
      />
    </div>
  );
};

export default TimeLine;
