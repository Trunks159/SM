import React from "react";
import styled from "@emotion/styled";
import { Paper } from "@material-ui/core";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
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

function TimeSlot({ timeslot, index }) {
  
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
      <StyledPaper trackLength = {trackLength} timeslot = {timeslot}>
        Start :{moment(startTime).format("h:mm a")} <br/>
        End : {moment(endTime).format("h:mm a")}
      </StyledPaper>

      <Draggable
       grid={[thirtyMin, thirtyMin]}
        axis={"y"}
        position={{ x: 0, y: timeslot.start }}
        bounds={{ top: 0, bottom: timeslot.end - twoHours }}
        onDrag={(e, newValue) => handleDrag(newValue.y, "start", index)}
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
      >
        <div className="stretch-btn">
          <img alt="Stretch2" style={{ rotate: "90deg" }} src={stretchIcon} />
        </div>
      </Draggable>
    </div>
  );
}

export default TimeSlot;
