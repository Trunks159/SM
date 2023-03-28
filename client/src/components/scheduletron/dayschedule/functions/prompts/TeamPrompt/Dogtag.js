import React from "react";
import styled from "@emotion/styled";
import { Slider, Button, Divider, Alert } from "@mui/material";
import removeIcon from "./assets/Remove Icon.svg";
import profileIcon from "./assets/Profile Icon.svg";
import dayjs from "dayjs";

function toSliderValues(startTime, endTime) {
  const start = dayjs(startTime);
  const end = dayjs(endTime);
  return {
    //from 6am - 12am
    start: ((start.hour() + start.minute() / 60) / 18) * 100,
    end: ((end.hour() + end.minute() / 60) / 24) * 100,
  };
}

const StyledButton = styled(Button)(({ isAddButton }) => ({
  minWidth: 0,
  height: 33,
  color: isAddButton ? "#11FF00" : "#FF0000",
  gap: 10,
  textTransform: "none",
  marginLeft: 10,
  "& img": {
    transform: isAddButton ? "rotate(45deg)" : "none",
    filter: isAddButton
      ? "invert(48%) sepia(50%) saturate(2255%) hue-rotate(80deg) brightness(132%) contrast(112%)"
      : "none",
  },
}));

const StyledSlider = styled(Slider)({
  pointerEvents: "none",
  "& .MuiSlider-thumb": {
    display: "none",
  },
  "& .MuiSlider-rail": {
    background: "#B9B9B9",
    borderRadius: 9,
  },
  "& .MuiSlider-track": {
    background: "#00BCFF",
    borderRadius: 4,
    dropShadow: "none",
  },
  margin: "auto",
  height: 40,
  transform: "rotate(180deg)",
});

function SliderSection({ startTime, endTime }) {
  const sliderValues = toSliderValues(startTime, endTime);

  return (
    <div className="slider-container-outer">
      <Divider orientation="vertical" />
      <div className="slider-container-inner">
        <p>{dayjs(startTime).format("h:mm a")}</p>
        <StyledSlider
          orientation="vertical"
          value={[sliderValues.start, sliderValues.end]}
        />
        <p>{dayjs(endTime).format("h:mm a")}</p>
      </div>
    </div>
  );
}

function Dogtag({
  startTime,
  endTime,
  user,
  handleProfileChange,
  isReadOnly,
  readOnlyWarning,
  handleAddToSchedule,
  handleRemoveFromSchedule,
}) {
  return (
    <>
      <div className="tm-dogtag">
        <div className="text-container">
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <p> {user.position}</p>
        </div>
        {startTime && <SliderSection startTime={startTime} endTime={endTime} />}
      </div>
      <StyledButton onClick={() => handleProfileChange(user)}>
        <img src={profileIcon} />
      </StyledButton>
      <StyledButton
        onClick={() =>
          isReadOnly
            ? readOnlyWarning()
            : startTime
            ? handleRemoveFromSchedule(user.id)
            : handleAddToSchedule(user.id)
        }
        isAddButton={!Boolean(startTime)}
      >
        <img
          style={{ transform: startTime ? "none" : "rotate(45deg)" }}
          src={removeIcon}
        />
        {startTime ? "Remove" : "Add"} TM
      </StyledButton>
    </>
  );
}

export default Dogtag;
