import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import stretchIcon from "./assets/Stretch Icon.svg";
import { Paper, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  pixToString,
  pixToTime,
  thirtyMin,
  timeToPix,
} from "../../../TimeFunctions";
import moment from "moment";

//currently the minimun width for a timeslot is 200px. It should really just be like 2 hours or something.
//Problem is it wont be exact, what you do is first you go and look

/*
THE FINAL SOLUTION
Do regular mapping over. So all styling and such and when done styling the
timeslots position the timeline accordingly
*/

/*
So what im trying to do here is load the timeslots into state without
but i cant until time in timeslots is updated.
So i guess 
*/



//ACTIONS
const addTimeslot = (timeslot) => ({
  type: "ADD_TIMESLOT",
  payLoad: timeslot,
});

const updateTime = (timeslot) => ({
  type: "UPDATE_TIME",
  payLoad: timeslot,
});

const updateTrackWidth = (newWidth) => ({
  type: "UPDATE_TRACK_WIDTH",
  payLoad: newWidth,
});

//so if the time is like 9:44PM, typically in 30min
//you'd get 10:14PM. What we need is actually 10:00PM
//if we drag left we need to go to 9:30PM

function roundIt(t) {
  //takes time in some dt format and rounds it up
  //to the closest 30 min
  const time = moment(t);
  const remainder = time.minute() % 30;
  if (remainder >= 15) {
    return time.subtract(remainder, "minutes").format();
  } else if (remainder < 15) {
    return time.add(remainder, "minutes").format();
  }
  return t;
}

//calculate 30 min and

function getThirtyMin(timerange, width) {
  //gets thirty min in pixels
  const [start, end] = timerange.map((t) => moment(t));
  const duration = moment.duration(end.diff(start)).asMinutes();
  const ratio = 30 / duration;
  return ratio * width;
}
//So the component needs to render before we update
//the height of everything
//on first render there will not be a height (itll be 0)
//At the end of the render
const TimeSlot = ({ index, user, workblock }) => {
  //-------INIT START--------
  const myRef = useRef(null);
  const _trackWidth = myRef.current ? myRef.current.clientHeight : 0;
  const timeslots = useSelector((state) => state.timeslots);
  const { trackWidth, timerange } = timeslots;

  const dispatch = useDispatch();


  const timeslot = timeslots.slots[index];
  const thirty = getThirtyMin(timerange, trackWidth);
  const [mounted, setMounted] = useState(false);
  //-------INIT END ---------

  function handleDrag(newValue, timeframe) {
    const time = pixToTime(newValue, trackWidth, timerange).format();
    const trueValue = roundIt(time);
    const pix = trueValue
      ? timeToPix(trueValue, trackWidth, timerange)
      : newValue;

    dispatch(
      updateTime({
        timeframe,
        newVal: pix,
        index,
      })
    );
  }

  useEffect(() => {
    dispatch(
      addTimeslot({
        startTime: workblock.startTime,
        endTime: workblock.endTime,
        user,
      })
    );
  }, []);

  useEffect(() => {
 
    if (_trackWidth > 0 && _trackWidth !== trackWidth) {
      dispatch(updateTrackWidth(_trackWidth));
      setMounted(true);
    }
  }, [_trackWidth]);

  if (timeslot) {
    const { start, end } = timeslot;
    const { firstName, lastName } = timeslot.user;
    return (
      <>
        <Button style={{ height: 40 }}>
          {firstName} {lastName}
        </Button>
        <div
          ref={myRef}
          style={{
            position: "relative",
            background: "red",
            margin: "40px 0px",
          }}
        >
          <Paper
            className="timeslot"
            style={{
              right: 10,
              left: 10,
              top: start,
              bottom: trackWidth - end < 0 ? 0 : trackWidth - end,
              minHeight: 200,
            }}
          >
            {moment(timeslot.getStartTime()).format("h:mm a")} <br /> - <br />
            {moment(timeslot.getEndTime()).format("h:mm a")}
          </Paper>
          <Draggable
            axis="y"
            //when the grid is set to [0,thirty], it doesn't work so keep this
            grid={[thirty, thirty]}
            position={{ x: 0, y: start }}
            bounds={{ top: 0, bottom: end - 200 }}
            onDrag={(e, newValue) => handleDrag(newValue.y, "start")}
          >
            <div className="stretch-btn">
              <img style={{ rotate: "90deg" }} src={stretchIcon} />
            </div>
          </Draggable>
          <Draggable
            axis="y"
            //when the grid is set to [0,thirty], it doesn't work so keep this
            grid={[thirty, thirty]}
            position={{ x: 0, y: end }}
            bounds={{ top: start + 200, bottom: trackWidth }}
            onDrag={(e, newValue) => handleDrag(newValue.y, "end")}
          >
            <div className="stretch-btn2">
              <img style={{ rotate: "90deg" }} src={stretchIcon} />
            </div>
          </Draggable>
        </div>
      </>
    );
  }
  return null;
};

export default TimeSlot;
