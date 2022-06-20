import React, { Component } from "react";
import { display } from "@mui/system";

const TimeLine = ({ isDesktop }) => {
  const times = isDesktop
    ? ["6am", "10:30am", "3pm", "7:30pm", "12am"]
    : ["6am", "10:30am", "3pm"];

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
        {times.map((time, index) => (
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
