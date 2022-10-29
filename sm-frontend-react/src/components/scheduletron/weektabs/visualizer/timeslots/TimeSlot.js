import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import stretchIcon from "./assets/Stretch Icon.svg";
import { Paper } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { pixToString, pixToTime, thirtyMin } from "../../../TimeFunctions";
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
  const remainder = 30 - (time.minute() % 30);
  return time.add(remainder, "minutes").format();
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
        <div style={{ position: "relative", height: "100%" }}>
          <Paper
            className="timeslot"
            style={{
              top: 0,
              bottom: 0,
              margin: "6px 0px 6px 0px",
              left: start,
              right: containerWidth - end < 0 ? 0 : containerWidth - end,
              minWidth: 200,
            }}
          >
            {user.firstName} {user.lastName} startTime :
            {moment(timeslot.getStartTime()).format("h:mm a")}, endtime:
            {moment(timeslot.getEndTime()).format("h:mm a")}
          </Paper>
          <Draggable
            axis="x"
            grid={[thirtyMin(start, containerWidth, availableTimes), 0]}
            position={{ x: start, y: 0 }}
            bounds={{ left: 0, right: end - 200 }}
            onDrag={(e, newValue) =>
              dispatch(
                updateTime({
                  timeframe: "start",
                  newVal: newValue.x,
                  index,
                })
              )
            }
          >
            <div className="stretch-btn">
              <img src={stretchIcon} />
            </div>
          </Draggable>
          <Draggable
            axis="x"
            grid={[thirtyMin(end, containerWidth, availableTimes), 0]}
            bounds={{ left: start + 200, right: containerWidth }}
            position={{ x: end, y: 0 }}
            onDrag={(e, newValue) => {
              //maybe ondrag you can round first?
              console.log('Mommy please: ', pixToTime(newValue.x, containerWidth, availableTimes))
              return dispatch(
                updateTime({ timeframe: "end", newVal: newValue.x, index })
              );
            }}
          >
            <div className="stretch-btn">
              <img src={stretchIcon} />
            </div>
          </Draggable>
        </div>
      )
    );
  }
  return null;
};

export default TimeSlot;
