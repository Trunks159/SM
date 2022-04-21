import React from "react";

function TimeLine() {
  return (
    <div
      style={{
        width: "100%",
        margin: "0 15px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <p style={{ margin: 0, fontSize: 13, color: "#888888" }}>7AM</p>
        <p
          style={{
            margin: "0 0 0 auto",
            fontSize: 13,
            color: "#888888",
          }}
        >
          12AM
        </p>
      </div>

      <svg style={{ height: 5, width: "100%" }}>
        <line
          style={{ display: "flex", alignItems: "center" }}
          stroke={"#C1C1C1"}
          strokeWidth={"1"}
          y1={"50%"}
          y2={"50%"}
          x1={"0%"}
          x2={"100%"}
        />
      </svg>
    </div>
  );
}

export default TimeLine;
