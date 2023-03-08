import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Draggable from "react-draggable";
import dayjs from "dayjs";
import { Box, Button, Fade } from "@mui/material";
import styled from "@emotion/styled";
import stretchIcon from "./assets/Stretch Icon.svg";

//ACTIONS

const updateTime = ({ newValue, timeframe, index }) => ({
  type: "UPDATE_TIME",
  payLoad: { newValue, timeframe, index },
});

const StyledBox = styled(Box)(({ trackLength, timeslot, dragging }) => ({
  position: "absolute",
  top: timeslot.start,
  bottom: trackLength - timeslot.end < 0 ? 0 : trackLength - timeslot.end,
  width: "50%",
  textTransform: "uppercase",
  display: "flex",
  alignItems: "center",
  background: dragging ? "#8ABEDE" : "rgba(0,0,0,.16)",
  borderRadius: 7,
  "& .start .end": {
    position: "absolute",
  },
}));

const DragButton = styled(Button)(({ dragging }) => ({
  background: dragging ? "#2B9DD9" : "rgba(0, 0, 0, 0.65)",
  height: "35px",
  width: "25px",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  borderRadius: "4px",
  minWidth: 0,

  "&:hover": {
    background: "#2B9DD9",
  },
  "& img": {
    pointerEvents: "none",
    width: 15,
    transform: "rotate(90deg)",
  },
}));

function TimeSlot({ timeslot, index, isReadOnly }) {
  const [dragging, setDragging] = useState(false);
  const dispatch = useDispatch();
  const currentSchedule = useSelector((state) => state.currentSchedule);
  const { trackLength } = currentSchedule;
  const thirtyMin = currentSchedule.getThirtyMin();
  const twoHours = currentSchedule.getTwoHours();
  const { startTime, endTime } = currentSchedule.toWorkBlock(timeslot);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      setOpen(true);
    }
  }, [open]);

  function handleDrag(newValue, timeframe, index) {
    dispatch(
      updateTime({
        timeframe,
        newValue: newValue,
        index,
      })
    );
  }
  return (
    <Fade in={open}>
      <div
        className="timeslot-track"
        style={{
          height: trackLength,
        }}
      >
        <StyledBox
          dragging={dragging}
          trackLength={trackLength}
          timeslot={timeslot}
        ></StyledBox>

        <Draggable
          position={{ x: 0, y: timeslot.start }}
          bounds={{ top: 0, bottom: timeslot.end - twoHours }}
          onDrag={(e, newValue) => handleDrag(newValue.y, "start", index)}
          grid={[thirtyMin, thirtyMin]}
          axis={"y"}
          onStart={() => setDragging(true)}
          onStop={() => setDragging(false)}
          disabled={isReadOnly}
        >
          <div className="stretch-btn">
            <div className="stretch-time start">
              <p> Start :{dayjs(startTime).format("h:mm a")}</p>
            </div>
            <DragButton dragging={dragging}>
              <img alt="Stretch1" src={stretchIcon} />
            </DragButton>
          </div>
        </Draggable>
        <Draggable
          position={{ x: 0, y: timeslot.end }}
          bounds={{
            top: timeslot.start + twoHours,
            bottom: trackLength,
          }}
          onDrag={(e, newValue) => handleDrag(newValue.y, "end", index)}
          grid={[thirtyMin, thirtyMin]}
          axis={"y"}
          onStart={() => setDragging(true)}
          onStop={() => setDragging(false)}
          disabled={isReadOnly}
        >
          <div className="stretch-btn">
            <DragButton dragging={dragging}>
              <img alt="Stretch1" src={stretchIcon} />
            </DragButton>
            <div className="stretch-time end">
              <p> End : {dayjs(endTime).format("h:mm a")}</p>
            </div>
          </div>
        </Draggable>
      </div>
    </Fade>
  );
}

export default TimeSlot;
