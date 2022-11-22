import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import stretchIcon from "./assets/Stretch Icon.svg";
import { Button, Paper } from "@material-ui/core";
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

//ACTIONS
const addTimeslot = (timeslot) => ({
  type: "ADD_TIMESLOT",
  payLoad: timeslot,
});

const updateTime = (timeslot) => ({
  type: "UPDATE_TIME",
  payLoad: timeslot,
});

//so if the time is like 9:44PM, typically in 30min
//you'd get 10:14PM. What we need is actually 10:00PM
//if we drag left we need to go to 9:30PM

function roundIt(t) {
  //takes time in some dt format and rounds it up
  //to the closest 30 min
  const time = moment(t);
  const remainder = time.minute() % 30;
  console.log("remainder: ", remainder);
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

const TimeSlot = ({
  index,
  user,
  availableTimes,
  containerWidth,
  workblock,
  day,
}) => {
  const dispatch = useDispatch();
  const timeslots = useSelector((state) => state.timeslots);
  const timeslot = timeslots.timeslots[index];
  const thirty = getThirtyMin(availableTimes, containerWidth);
  function handleDrag(newValue, timeframe) {
    console.log("new:", newValue);
    const time = pixToTime(newValue, containerWidth, availableTimes).format();
    const trueValue = roundIt(time);
    const pix = trueValue
      ? timeToPix(trueValue, containerWidth, availableTimes)
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
        dayId: day.id,
        containerWidth,
        availableTimes,
        user,
      })
    );
  }, []);

  if (timeslot) {
    const { start, end } = timeslot;
    return (
      timeslot && (
        <>
          <Button
          //sized by the grid its in
            style={{
              textTransform: "capitalize",
              fontSize: 14,
              borderBottom: "1px solid rgba(112, 112, 112, .14)",
            }}
          >
            {user.firstName} {user.lastName}
          </Button>
          <div className = {'time-track'} style={{ position: "relative" }}>
            {/*Each of the tracks needs to have the same padding and sizing, so each needs to
            be sized by the container holding it so something like grid
            So for Visualizer its
            viz is a grid with template columns 30px and 1fr
            Then Timeslots is a grid with template rows 30px and 1fr
            How do you get access to the height of the bottomrow
            <Viz>
              <Timeslots>
              </Timeslots>
            </Viz>
            */}
            <Paper
              className="timeslot"
              style={{
                right: 10,
                left: 10,
                top: start,
                bottom: containerWidth - end < 0 ? 0 : containerWidth - end,
                /*
              top: start,
              bottom: ,
             */
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
              bounds={{ top: start + 200, bottom: containerWidth }}
              onDrag={(e, newValue) => handleDrag(newValue.y, "end")}
            >
              <div className="stretch-btn2">
                <img style={{ rotate: "90deg" }} src={stretchIcon} />
              </div>
            </Draggable>
          </div>

          {/*
          <Draggable
            axis="y"
            grid={[0, thirty]}
            position={{ x: start, y: 0 }}
            bounds={{ left: 0, right: end - 200 }}
            onDrag={(e, newValue) => handleDrag(newValue.x, "start")}
            name={"start"}
          >
            <div className="stretch-btn">
              <img src={stretchIcon} />
            </div>
          </Draggable>
          <Draggable
            axis="y"
            grid={[0, thirty]}
            bounds={{ top: start + 200, bottom: containerWidth }}
            position={{ x: end, y: 0 }}
            name="end"
            onDrag={(e, newValue) => handleDrag(newValue.x, "end")}
          >
            <div className="stretch-btn">
              <img src={stretchIcon} />
            </div>
          </Draggable>*/}
        </>
      )
    );
  }
  return null;
};

export default TimeSlot;
