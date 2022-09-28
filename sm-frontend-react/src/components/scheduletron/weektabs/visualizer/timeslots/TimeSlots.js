import moment from "moment";
import React from "react";
import { arrayOfDates } from "../../../../TimeFunctions";
import TimeSlot from "./TimeSlot";
import "./timeslots.css";

const getTimelineRange = ({ day, night }, theDate) => {
  theDate = moment(theDate);
  const set = [
    theDate.clone().set({ h: 6, m: 0 }),
    theDate.clone().set({ h: 15, m: 0 }),
    theDate.clone().set({ h: 0, m: 0 }).add(1, "days"),
  ];
  //for some reason when you omit the a at the end
  // it gets translated back to 12PM dude idk...
  if (day && night) {
    return [
      set[0].format("YYYY-MM-DD hh:mm:ss a"),
      set[2].format("YYYY-MM-DD hh:mm:ss a"),
    ];
  } else if (day === true) {
    return [
      set[0].format("YYYY-MM-DD hh:mm:ss a"),
      set[1].format("YYYY-MM-DD hh:mm:ss a"),
    ];
  }

  return [
    set[1].format("YYYY-MM-DD hh:mm:ss a"),
    set[2].format("YYYY-MM-DD hh:mm:ss a"),
  ];
};

const isBetween = (workblock, timelineRange) => {
  const startTime = moment(workblock.startTime);
  const endTime = moment(workblock.endTime);
  return (
    startTime.isBetween(moment(timelineRange[0]), moment(timelineRange[1])) ||
    endTime.isBetween(moment(timelineRange[0]), moment(timelineRange[1]))
  );
};

const TimeSlots = ({ workblocks, shiftFilter, theDate, isMobile }) => {
  const timelineRange = getTimelineRange(shiftFilter, theDate);
  return (
    <ul className="timeslots">
      {workblocks.map((workblock, index) => {
        return (
          //if the user works outside of the time range dont render them
          isBetween(workblock, timelineRange) && (
            <li key={workblock.wbId}>
              <TimeSlot
                index={index}
                dates={arrayOfDates()}
                availableTimes={timelineRange}
                startTime={workblock.startTime}
                endTime={workblock.endTime}
                shiftFilter={shiftFilter}
                user={workblock.user}
                isMobile={isMobile}
              />
            </li>
          )
        );
      })}
    </ul>
  );
};

export default TimeSlots;
