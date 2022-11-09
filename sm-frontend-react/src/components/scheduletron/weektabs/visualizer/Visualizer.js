import React, { useEffect } from "react";
import ShiftFilter from "./shiftfilter/ShiftFilter";
import TimeLine from "./TimeLine";
import TimeSlots from "./timeslots/TimeSlots";
import "./visualizer.css";

//Timeslot overflow feature isn't working properly rn
//maybe use a gradient?

function Visualizer({ day, workblocks }) {
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
    <div className="visualizer">
      {/* <ShiftFilter
        handleShiftFilter={handleShiftFilter}
        handleSwitch={handleSwitch}
        shiftFilter={shiftFilter}
      />*/}

      <div
        style={{
          margin: "0px 0px 32px 0px",
          position: "relative",
          flex: 1,
        }}
      >
        <TimeLine shiftFilter={shiftFilter} />
        <TimeSlots
          shiftFilter={shiftFilter}
          workblocks={workblocks}
          day={day}
          theDate={day.date}
        />
      </div>
    </div>
  );
}

export default Visualizer;
