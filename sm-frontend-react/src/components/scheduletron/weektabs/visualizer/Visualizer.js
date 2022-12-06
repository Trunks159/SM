import React, { useEffect } from "react";
import ShiftFilter from "./shiftfilter/ShiftFilter";
import TimeLine from "./TimeLine";
import TimeSlots from "./timeslots/TimeSlots";
import Table from "./timeslots/TimeSlotsTable";
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

      <Table />
      {/*          <TimeLine shiftFilter={shiftFilter} /> <TimeSlots
          shiftFilter={shiftFilter}
          workblocks={workblocks}
          day={day}
          theDate={day.date}
        />*/}
    </div>
  );
}

export default Visualizer;
