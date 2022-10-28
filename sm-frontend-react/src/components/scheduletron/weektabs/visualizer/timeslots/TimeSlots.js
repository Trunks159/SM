import moment from "moment";
import React, { useRef, useEffect, useState } from "react";
import { arrayOfDates } from "../../../../TimeFunctions";
import TimeSlot from "./TimeSlot";
import "./timeslots.css";
import { useSelector, useDispatch } from "react-redux";

//actions
const updateContainerWidth = (newWidth) => ({
  type: "UPDATE_CONTAINER_WIDTH",
  payLoad: newWidth,
});
const updateTimeRange = (newVal) => ({
  type: "UPDATE_TIMERANGE",
  payLoad: newVal,
});

const dumpTimeslots = () => ({
  type: "DUMP_TIMESLOTS",
});

//Timeslots needs to be reset to an empty array
//whenever day changes

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

const TimeSlots = ({ workblocks, shiftFilter, theDate, isMobile, day }) => {
  const timelineRange = getTimelineRange(shiftFilter, theDate);
  const myRef = useRef();
  const dispatch = useDispatch();
  const width = myRef.current ? myRef.current.clientWidth : 0;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (width > 0) {
      dispatch(updateContainerWidth(width));
      //short term solution to shiftfilter timerange stuff
      dispatch(updateTimeRange(timelineRange));
      setMounted(true);
    }
  }, [width]);

  useEffect(() => dispatch(dumpTimeslots()), []);

  return (
    <ul className="timeslots" ref={myRef}>
      {mounted &&
        workblocks.map((workblock, index) => {
          const x = isBetween(workblock, timelineRange);
          return (
            //if the user works outside of the time range dont render them
            isBetween(workblock, timelineRange) && (
              <li key={workblock.wbId}>
                <TimeSlot
                  index={index}
                  dates={arrayOfDates()}
                  availableTimes={timelineRange}
                  workblock={workblock}
                  shiftFilter={shiftFilter}
                  user={workblock.user}
                  isMobile={isMobile}
                  containerWidth={width}
                  day={day}
                />
              </li>
            )
          );
        })}
    </ul>
  );
};

export default TimeSlots;
