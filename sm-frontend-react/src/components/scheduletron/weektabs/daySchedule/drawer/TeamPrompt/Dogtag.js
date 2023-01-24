import React from "react";
import styled from "@emotion/styled";
import { Slider, Button, Divider } from "@mui/material";
import removeIcon from "./assets/Remove Icon.svg";
import profileIcon from "./assets/Profile Icon.svg";
import moment from "moment";

function toSliderValues(startTime, endTime) {
  const start = moment(startTime);
  const end = moment(endTime);
  return {
    //from 6am - 12am
    start: ((start.hours() + start.minutes() / 60) / 18) * 100,
    end: ((end.hours() + end.minutes() / 60) / 24) * 100,
  };
}

const StyledButton = styled(Button)({
  minWidth: 0,
  width: 33,
  height: 33,
});

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
        <p>{moment(startTime).format("h:mm a")}</p>
        <StyledSlider
          orientation="vertical"
          value={[sliderValues.start, sliderValues.end]}
        />
        <p>{moment(endTime).format("h:mm a")}</p>
      </div>
    </div>
  );
}

function Dogtag({ startTime, endTime, user, handleProfileChange }) {
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
      <StyledButton>
        <img
          style={{ transform: startTime ? "none" : "rotate(45deg)" }}
          src={removeIcon}
        />
      </StyledButton>
    </>
  );
}

export default Dogtag;
