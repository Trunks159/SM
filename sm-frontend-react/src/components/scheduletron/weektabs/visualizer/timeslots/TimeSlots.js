import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import TimeSlot from "./TimeSlot";
import TimeSlotMobile from "./TimeSlotMobile";
import "./timeslots.css";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import SlotLabels from "./SlotLabels";

//actions

const updateTimeRange = (newVal) => ({
  type: "UPDATE_TIMERANGE",
  payLoad: newVal,
});

const dumpTimeslots = () => ({
  type: "DUMP_TIMESLOTS",
});

const updateTrackWidth = (newWidth) => ({
  type: "UPDATE_TRACK_WIDTH",
  payLoad: newWidth,
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
  const myRef = useRef();
  //controls and initializes the width and timerange for timeslots
  const _width = myRef.current ? myRef.current.clientHeight : 0;
  const _timelineRange = getTimelineRange(shiftFilter, theDate);
  const { timerange, trackWidth } = useSelector((state) => state.timeslots);

  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const screenWidth = useSelector((state) => state.screenWidth);
  const isMobile = screenWidth < 600;

  useEffect(() => {
    if (
      _timelineRange[0] !== timerange[0] ||
      _timelineRange[1] !== timerange[1]
    ) {
      dispatch(updateTimeRange(_timelineRange));
    }
    if (_width > 0 && _width !== trackWidth) {
      dispatch(updateTrackWidth(_width));
    }

    setMounted(true);
  }, [_width, _timelineRange]);

  //CLEANUP
  useEffect(() => dispatch(dumpTimeslots()), []);

  return (
    <div style={{ flex: 1, display: "grid", gridTemplateRows: "70px 1fr" }}>
      <SlotLabels />
      <div style={{ position: "relative" }}>
        <ul ref={myRef} className="timeslots">
          {mounted ? (
            workblocks.map((workblock, index) => {
              return (
                //if the user works outside of the time range dont render them
                isBetween(workblock, timerange) && (
                  <li key={workblock.wbId} style={{ background: "red" }}>
                    {isMobile ? (
                      <TimeSlotMobile
                        index={index}
                        workblock={workblock}
                        user={workblock.user}
                      />
                    ) : (
                      <TimeSlot
                        index={index}
                        workblock={workblock}
                        user={workblock.user}
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
    </div>
  );
};

export default TimeSlots;
