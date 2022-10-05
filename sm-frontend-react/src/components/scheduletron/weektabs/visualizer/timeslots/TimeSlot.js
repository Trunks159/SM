import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import stretchIcon from "./assets/Stretch Icon.svg";
import { Paper } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { pixToString, thirtyMin } from "../../../TimeFunctions";

//ACTIONS
const addTimeslot = (timeslot) => ({
  type: "ADD_TIMESLOT",
  payLoad: timeslot,
});

const updateTime = (timeslot) => ({
  type: "UPDATE_TIME",
  payLoad: timeslot,
});

const TimeSlot = ({
  index,
  user,
  availableTimes,
  containerWidth,
  workblock,
  dayId,
}) => {
  const dispatch = useDispatch();
  const timeslots = useSelector((state) => state.timeslots);
  const timeslot = timeslots.timeslots[index];
  if (timeslot) {
    console.log("Timeslot: ", timeslot.getStartTime());
  }

  useEffect(() => {
    dispatch(
      addTimeslot({
        startTime: workblock.startTime,
        endTime: workblock.endTime,
        containerWidth,
        availableTimes,
        user,
        dayId,
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
            {pixToString(start, containerWidth, availableTimes)}, endtime:
            {pixToString(end, containerWidth, availableTimes)}
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
