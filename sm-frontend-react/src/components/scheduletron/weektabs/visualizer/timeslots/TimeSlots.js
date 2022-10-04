import moment from "moment";
import React, { useRef, useEffect } from "react";
import { arrayOfDates } from "../../../../TimeFunctions";
import TimeSlot from "./TimeSlot";
import "./timeslots.css";
import { useSelector, useDispatch } from "react-redux";

//ACTIONS
const updateTimeslots = (timeslots) => ({
  type: "UPDATE_TIMESLOTS",
  payLoad: timeslots,
});

const updateContainerWidth = (containerWidth) => ({
  type: "UPDATE_CONTAINER_WIDTH",
  payLoad: containerWidth,
});

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

const TimeSlots = ({ workblocks, shiftFilter, theDate, isMobile, dayId }) => {
  const timelineRange = getTimelineRange(shiftFilter, theDate);
  const myRef = useRef();
  const width = myRef.current ? myRef.current.clientWidth : 0;
  const cWidth = useSelector((state) => state.containerWidth);
  const timeslots = useSelector((state) => state.timeslots);
  const dispatch = useDispatch();

  useEffect(() => {
    const growth = cWidth > 0 && width / cWidth;
    if (growth) {
      if (timeslots) {
        dispatch(
          updateTimeslots(
            timeslots.map((ts) => {
              return {
                ...ts,
                startTime: ts.startTime * growth,
                endTime: ts.endTime * growth,
              };
            })
          )
        );
      }
    }
    dispatch(updateContainerWidth(width));
  }, [width]);

  return (
    <ul className="timeslots" ref={myRef}>
      {workblocks.map((workblock, index) => {
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
                dayId={dayId}
              />
            </li>
          )
        );
      })}
    </ul>
  );
};

export default TimeSlots;
