import React from "react";

const test1 = () => {
  const availableTimes = [6, 15];
  const availableTimesDiff = availableTimes[1] - availableTimes[0];
  const workslot = [7, 12];
  const workslotDiff = workslot[1] - workslot[0];
  const width = (workslotDiff / availableTimesDiff) * 100 + "%";
  const marginLeft =
    ((workslot[0] - availableTimes[0]) / availableTimesDiff) * 100 + "%";
  return { marginLeft: marginLeft, width: width };
};

const test2 = () => {
  const availableTimes = [6, 15];
  const availableTimesDiff = availableTimes[1] - availableTimes[0];
  const workslot = [2, 12];
  let marginLeft =
    ((workslot[0] - availableTimes[0]) / availableTimesDiff) * 100;
  const width = ((workslot[1] - availableTimes[0]) / availableTimesDiff) * 100;

  return { marginLeft: marginLeft, width: width };
};

console.log("Test1: ", test2());

const TimeSlot = () => {
  const styles = test2();
  return (
    <div
      className="time-slot"
      style={{
        minWidth: 130,
        borderRadius: styles.marginLeft < 0 ? "0px 7px 7px 0px" : "7px",
      }}
    >
      <p
        style={{
          textTransform: "capitalize",
          fontWeight: "bold",
          position: "absolute",
          margin: 0,
          top: "18%",
          fontSize: "1.2rem",
        }}
      >
        jordan giles
      </p>
      <p
        style={{
          textTransform: "uppercase",
          fontSize: ".8rem",
          margin: 0,
          bottom: "17%",
          position: "absolute",
        }}
      >
        2am - 1pm
      </p>

      <svg
        width={20}
        height={"66px"}
        style={{ position: "absolute", left: -20 }}
      >
        <line
          strokeDasharray="1, 2"
          x1={0}
          y1={0}
          x2="100%"
          strokeWidth={"300px"}
          stroke={"#2B9DD9"}
        />
      </svg>
    </div>
  );
};
export default TimeSlot;
