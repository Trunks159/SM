import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Draggable from "react-draggable";
import dayjs from "dayjs";
import { Paper } from "@mui/material";
import styled from "@emotion/styled";
import stretchIcon from "./assets/Stretch Icon.svg";

//ACTIONS

const updateTime = ({ newValue, timeframe, index }) => ({
  type: "UPDATE_TIME",
  payLoad: { newValue, timeframe, index },
});

const StyledPaper = styled(Paper)(({ trackLength, timeslot }) => ({
  position: "absolute",
  top: timeslot.start,
  bottom: trackLength - timeslot.end < 0 ? 0 : trackLength - timeslot.end,
  right: 10,
  left: 10,
  textTransform: "uppercase",
  display: "flex",
  alignItems: "center",
}));

function TimeSlot({ timeslot, index, isReadOnly }) {
  const dispatch = useDispatch();
  const currentSchedule = useSelector((state) => state.currentSchedule);
  const { trackLength } = currentSchedule;
  const thirtyMin = currentSchedule.getThirtyMin();
  const twoHours = currentSchedule.getTwoHours();
  const { startTime, endTime } = currentSchedule.toWorkBlock(timeslot);

  function handleDrag(newValue, timeframe, index) {
    /*This is mostly because of the rounding errors
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
        */

    //update time in redux
    dispatch(
      updateTime({
        timeframe,
        newValue: newValue,
        index,
      })
    );
  }
  return (
    <div
      className="timeslot-track"
      style={{
        height: trackLength,
      }}
    >
      <StyledPaper trackLength={trackLength} timeslot={timeslot}>
        Start :{dayjs(startTime).format("h:mm a")} <br />
        End : {dayjs(endTime).format("h:mm a")}
      </StyledPaper>

      <Draggable
        grid={[thirtyMin, thirtyMin]}
        axis={"y"}
        position={{ x: 0, y: timeslot.start }}
        bounds={{ top: 0, bottom: timeslot.end - twoHours }}
        onDrag={(e, newValue) => handleDrag(newValue.y, "start", index)}
        disabled={isReadOnly}
      >
        <div className="stretch-btn">
          <img alt="Stretch1" style={{ rotate: "90deg" }} src={stretchIcon} />
        </div>
      </Draggable>
      <Draggable
        grid={[thirtyMin, thirtyMin]}
        axis={"y"}
        position={{ x: 0, y: timeslot.end }}
        bounds={{
          top: timeslot.start + twoHours,
          bottom: trackLength,
        }}
        onDrag={(e, newValue) => handleDrag(newValue.y, "end", index)}
        disabled={isReadOnly}
      >
        <div className="stretch-btn">
          <img alt="Stretch2" style={{ rotate: "90deg" }} src={stretchIcon} />
        </div>
      </Draggable>
    </div>
  );
}

export default TimeSlot;
