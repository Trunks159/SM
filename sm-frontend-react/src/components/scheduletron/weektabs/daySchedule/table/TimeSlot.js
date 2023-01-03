import React from "react";
import styled from "@emotion/styled";
import { Paper } from "@material-ui/core";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const MyPaper = () => <Paper />;

const StyledPaper = styled(MyPaper)(({ trackWidth, timeslot }) => ({
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
  const { trackLength, toWorkBlock } = currentSchedule;
  const { startTime, endTime } = toWorkBlock(timeslot);
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
      <StyledPaper>
        Start :{moment(startTime).format("h:mm a")}
        End : {moment(endTime).format("h:mm a")}
      </StyledPaper>

      <Draggable
        axis={"y"}
        position={{ x: 0, y: timeslot.start }}
        bounds={{ top: 0, bottom: timeslot.end - 200 }}
        onDrag={(e, newValue) => handleDrag(newValue.y, "start", index)}
      >
        <div className="stretch-btn">
          <img alt="Stretch1" style={{ rotate: "90deg" }} src={stretchIcon} />
        </div>
      </Draggable>
      <Draggable
        axis={"y"}
        position={{ x: 0, y: timeslot.end }}
        bounds={{
          top: timeslot.start + 200,
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
