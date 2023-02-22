import React from "react";

function FancyDivider() {
  return (
    <svg
      style={{
        height: 30,
        width: "100%",
        margin: "15px 0px",
      }}
    >
      <line
        stroke={"#A3A3A3"}
        strokeWidth={"2px"}
        y1={"0%"}
        y2={"0%"}
        x1={"0%"}
        x2={105}
      />
      <line
        stroke={"#54DCF2"}
        strokeWidth={"2px"}
        y1={"50%"}
        y2={"50%"}
        x1={"0%"}
        x2={40}
      />
      <line
        stroke={"#A3A3A3"}
        strokeWidth={"2px"}
        y1={"100%"}
        y2={"100%"}
        x1={"0%"}
        x2={"100%"}
      />
    </svg>
  );
}

export default FancyDivider;
