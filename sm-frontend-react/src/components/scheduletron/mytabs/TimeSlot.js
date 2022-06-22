import React from "react";
import { timeToFloat } from "../../TimeFunctions";

const timeslotPosition = (availableTimes = [6, 15], workslot = [2, 17]) => {
  /*Returns marginleft and width of the timeslot and lets
    react know whether theres overflow or not
  */

  console.log("Get stuff: ", availableTimes, workslot);
  const availableTimesDiff = availableTimes[1] - availableTimes[0];
  const marginLeft = workslot[0] - availableTimes[0];
  const marginRight = availableTimes[1] - workslot[1];
  const overflowLeft = marginLeft < 0 ? Math.abs(marginLeft) : 0;
  const overflowRight = marginRight < 0 ? Math.abs(marginRight) : 0;
  const width = workslot[1] - workslot[0] - overflowLeft - overflowRight;
  const toPercentage = (item) => (item / availableTimesDiff) * 100 + "%";
  return {
    width: toPercentage(width),
    marginLeft: marginLeft < 0 ? "0%" : toPercentage(marginLeft),
    overflowLeft: overflowLeft !== 0,
    overflowRight: overflowRight !== 0,
  };
};

const TimeSlot = ({ shiftFilter, availableTimes, workslot }) => {
  const [background, setBackground] = React.useState("#2B9DD9");
  const handleMouseEnter = () => setBackground("#00A7FF");
  const handleMouseLeave = () => setBackground("#2B9DD9");

  const { overflowLeft, overflowRight, width, marginLeft } = timeslotPosition(
    availableTimes,
    workslot
  );
  return (
    <div
      className="time-slot"
      style={{
        minWidth: 130,
        width: width,
        marginLeft: marginLeft,
        borderRadius: `${overflowLeft ? "0px" : "7px"} ${
          overflowRight ? "0px" : "7px"
        } ${overflowRight ? "0px" : "7px"} ${overflowLeft ? "0px" : "7px"}`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
      {overflowLeft && (
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
            stroke={background}
          />
        </svg>
      )}
      {overflowRight && (
        <svg
          width={20}
          height={"66px"}
          style={{ position: "absolute", right: -20 }}
        >
          <line
            strokeDasharray="1, 2"
            x1={0}
            y1={0}
            x2="100%"
            strokeWidth={"300px"}
            stroke={background}
          />
        </svg>
      )}
    </div>
  );
};
export default TimeSlot;
