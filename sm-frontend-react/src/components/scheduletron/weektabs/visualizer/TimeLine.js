import { Divider } from "@mui/material";
import React from "react";

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
    <div className="timeline">
      <div className="timeline-labels">
        {timeLabels.map((time, index) => (
          <p
            key={index}
            style={{
              fontSize: index % 2 !== 0 ? "10px" : "14px",
              marginTop: index % 2 !== 0 ? "auto" : 0,
            }}
          >
            {time}
          </p>
        ))}
      </div>
      <Divider />
    </div>
  );
};

export default TimeLine;
