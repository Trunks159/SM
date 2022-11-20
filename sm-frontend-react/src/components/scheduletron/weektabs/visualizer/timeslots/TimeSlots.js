import moment from "moment";
import React, { useRef, useEffect, useState } from "react";
import { arrayOfDates } from "../../../../TimeFunctions";
import TimeSlot from "./TimeSlot";
import TimeSlotMobile from "./TimeSlotMobile";
import "./timeslots.css";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

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
  console.log(
    "StartTime: ",
    startTime.format(),
    " Timerange1: ",
    moment(timelineRange[1]).format()
  );
  return (
    startTime.isBetween(
      moment(timelineRange[0]),
      moment(timelineRange[1]),
      null,
      "[]"
    ) ||
    endTime.isBetween(
      moment(timelineRange[0]),
      moment(timelineRange[1]),
      null,
      "[]"
    )
  );
};

const TimeSlots = ({ workblocks, shiftFilter, theDate, day }) => {
  const timelineRange = getTimelineRange(shiftFilter, theDate);
  const myRef = useRef();
  const dispatch = useDispatch();

  const [mounted, setMounted] = useState(false);
  const screenWidth = useSelector((state) => state.screenWidth);
  const isMobile = screenWidth < 600;
  const width = ((isMobile) =>
    //uses height if isMobile is true, else uses width
    isMobile
      ? myRef.current
        ? myRef.current.clientHeight
        : 0
      : myRef.current
      ? myRef.current.clientWidth
      : 0)(isMobile);

  useEffect(() => {
    console.log("The widthc: ", width);
    if (width > 0) {
      dispatch(updateTimeRange(timelineRange));
      dispatch(updateContainerWidth(width));
      //short term solution to shiftfilter timerange stuff
      setMounted(true);
    }
  }, [width]);

  useEffect(() => dispatch(dumpTimeslots()), []);
  console.log("Ismobile : ", isMobile);
  return (
    <div style = {{flex : 1 , position : 'relative'}}>
<ul className="timeslots" ref={myRef}>
      {mounted ? (
        workblocks.map((workblock, index) => {
          return (
            //if the user works outside of the time range dont render them
            isBetween(workblock, timelineRange) && (
              <li key={workblock.wbId}>
                {isMobile ? (
                  <TimeSlotMobile
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
                ) : (
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
                )}
              </li>
            )
          );
        })
      ) : (
        <CircularProgress />
      )}
    </ul>
    </div>
    
  );
};

export default TimeSlots;
