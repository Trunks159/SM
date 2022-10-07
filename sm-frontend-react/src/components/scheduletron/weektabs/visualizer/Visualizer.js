import React from "react";
import ShiftFilter from "./shiftfilter/ShiftFilter";
import TimeLine from "./TimeLine";
import TimeSlots from "./timeslots/TimeSlots";
import "./visualizer.css";
import { useSelector, useDispatch } from "react-redux";

//Timeslot overflow feature isn't working properly rn
//maybe use a gradient?

const Visualizer = ({ isDesktop, day, hidden, workblocks }) => {
  const [shiftFilter, setShiftFilter] = React.useState({
    day: true,
    night: true,
  });
  const handleShiftFilter = (newValue) =>
    setShiftFilter({ shiftFilter: newValue });
  const handleSwitch = (newValue, name) =>
    setShiftFilter({
      shiftFilter: { ...shiftFilter, [name]: newValue },
    });

  return (
    <div
      className="visualizer"
      style={{
        display: hidden ? "none" : "flex",
        flexDirection: "column",
      }}
      hidden={hidden}
    >
      <ShiftFilter
        handleShiftFilter={handleShiftFilter}
        handleSwitch={handleSwitch}
        shiftFilter={shiftFilter}
        isDesktop={isDesktop}
      />
      <div
        style={{
          margin: "0px 80px 27px 80px",
          position: "relative",
          flex: 1,
        }}
      >
        <TimeLine shiftFilter={shiftFilter} isDesktop={isDesktop} />
        <TimeSlots
          shiftFilter={shiftFilter}
          workblocks={workblocks}
          day={day}
          theDate={day.date}
          isMobile={!isDesktop}
        />
      </div>
    </div>
  );
};

export default Visualizer;
