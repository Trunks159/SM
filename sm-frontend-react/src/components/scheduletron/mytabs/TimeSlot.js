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

const test3 = () => {
  const availableTimes = [6, 15];
  const workslot = [2, 12];
  const marginLeft = workslot[0] - availableTimes[0];
  const marginRight = availableTimes[1] - workslot[1] ;
  const overflowLeft = Math.abs(marginLeft)
  const overflowRight = Math.abs(marginRight)
  const width = workslot[1] - workslot[0] - overflowLeft - overflowRight; 
  return {width : width * 100 + '%', marginLeft : marginLeft * 100 + '%', overflowLeft : Boolean(overflowLeft), overflowRight : Boolean(overflowRight) };
};

console.log("Test1: ", test2());

const TimeSlot = () => {
  const {overflowLeft, width, marginLeft, overflowRight} = test3();
  const [background, setBackground] = React.useState('#2B9DD9');
  const handleMouseEnter = ()=> setBackground('#00A7FF');
  const handleMouseLeave = ()=> setBackground('#2B9DD9');
  return (
    <div
      className="time-slot"
      style={{
        minWidth: 130,
        width :width,
        marginLeft  : marginLeft  ,
        borderRadius: `${overflowLeft ? '0px' : '7px'} ${overflowRight ? '0px' : '7px'} ${overflowRight ? '0px' : '7px'} ${overflowLeft ? '0px' : '7px'}` ,
      }}
      onMouseEnter = {handleMouseEnter}
      onMouseLeave = {handleMouseLeave}
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
          stroke={background}
        />
      </svg>
    </div>
  );
};
export default TimeSlot;
