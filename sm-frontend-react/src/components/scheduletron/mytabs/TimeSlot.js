import React from "react";
import { timeToFloat, miliToReg } from "../../TimeFunctions";
//***I have the idea to hide text depending on name character length

const timeslotPosition = (availableTimes = [6, 15], workslot = [2, 17]) => {
  /*Returns marginleft and width of the timeslot and lets
    react know whether theres overflow or not
  */

  const availableTimesDiff = availableTimes[1] - availableTimes[0];
  const marginLeft = workslot[0] - availableTimes[0];
  const marginRight = availableTimes[1] - workslot[1];
  const overflowLeft = marginLeft < 0 ? Math.abs(marginLeft) : 0;
  const overflowRight = marginRight < 0 ? Math.abs(marginRight) : 0;
  const width = workslot[1] - workslot[0] - overflowLeft - overflowRight;
  const toPercentage = (item) => (item / availableTimesDiff) * 100 + "%";
  console.log("Get stuff: ", width / availableTimesDiff);
  return {
    width: toPercentage(width),
    marginLeft: marginLeft < 0 ? "0%" : toPercentage(marginLeft),
    overflowLeft: overflowLeft !== 0,
    overflowRight: overflowRight !== 0,
    hideSelf: width / availableTimesDiff < 0.33,
  };
};

const overflowSVG = (position, background) => {
  const style = { position: "absolute" };
  style[position] = -20;
  return (
    <svg width={20} height={"66px"} style={style}>
      <line
        strokeDasharray="1, 2"
        x1={0}
        y1={0}
        x2="100%"
        strokeWidth={"300px"}
        stroke={background}
      />
    </svg>
  );
};

const TimeSlot = ({ availableTimes, workslot, user, workblock }) => {
  const [background, setBackground] = React.useState("#2B9DD9");
  const handleMouseEnter = () => setBackground("#00A7FF");
  const handleMouseLeave = () => setBackground("#2B9DD9");

  const { overflowLeft, overflowRight, width, marginLeft, hideSelf } =
    timeslotPosition(availableTimes, workslot);

  return (
    hideSelf || (
      <div
        className="time-slot"
        style={{
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
          {user.firstName} {user.lastName}
        </p>
        <p
          style={{
            textTransform: "lowercase",
            fontSize: ".8rem",
            margin: 0,
            bottom: "17%",
            position: "absolute",
          }}
        >
          {`${miliToReg(workblock.startTime)} - ${miliToReg(
            workblock.endTime
          )}`}
        </p>
        {overflowLeft && overflowSVG("left", background)}
        {overflowRight && overflowSVG("right", background)}
      </div>
    )
  );
};
export default TimeSlot;
