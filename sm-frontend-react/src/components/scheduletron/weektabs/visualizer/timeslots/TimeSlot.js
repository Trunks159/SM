import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import stretchIcon from "./assets/Stretch Icon.svg";
import { Paper } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  pixToTime,
  convertDates,
  roundIt,
  pixToString,
  thirtyMin,
} from "./TimeFunctions";

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
  isMobile,
  index,
  user,
  availableTimes,
  containerWidth,
  workblock,
  dayId,
}) => {
  console.log("Available Times: ", availableTimes);
  const dispatch = useDispatch();
  const timeslots = useSelector((state) => state.timeslots);
  const timeslot = timeslots.find((ts) => ts.userId === user.id);
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

    /*
    This is for when the timeslots becomes verticle in mobile

    const containerSize = this.props.isMobile
    ? this.myRef.current.parentElement.clientHeight
    : this.myRef.current.parentElement.clientWidth;
  //convert current pix to time then back to pix based on the containersize
  this.setState({ containerSize: containerSize });*/
  }, [isMobile]);

  if (timeslot) {
    console.log("Timeslotboys: ", timeslot);
    const { startTime, endTime } = timeslot;
    return (
      timeslot && (
        <div style={{ position: "relative", height: "100%" }}>
          <Paper
            className="timeslot"
            style={{
              top: 0,
              bottom: 0,
              margin: "6px 0px 6px 0px",
              left: startTime,
              right:
                containerWidth - endTime < 0 ? 0 : containerWidth - endTime,
              minWidth: 200,
            }}
          >
            {user.firstName} {user.lastName} startTime :{pixToString(startTime, containerWidth, availableTimes)}
            , endtime:
            {pixToString(endTime, containerWidth, availableTimes)}
          </Paper>
          <Draggable
            axis="x"
            grid={[thirtyMin(startTime, containerWidth, availableTimes), 0]}
            position={{ x: startTime, y: 0 }}
            bounds={{ left: 0, right: endTime - 200 }}
            onDrag={(e, newValue) =>
              dispatch(updateTime("startTime", newValue.x, index))
            }
          >
            <div className="stretch-btn">
              <img src={stretchIcon} />
            </div>
          </Draggable>
          <Draggable
            axis="x"
            grid={[thirtyMin(endTime, containerWidth, availableTimes), 0]}
            bounds={{ left: startTime + 200, right: containerWidth }}
            position={{ x: endTime, y: 0 }}
            onDrag={(e, newValue) =>
              dispatch(updateTime("endTime", newValue.x, index))
            }
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
