import styled from "@emotion/styled";
import { Slider } from "@mui/material";
import React, { useState } from "react";
import moment from "moment";

const BASE_DATE = "1970-01-01 00";

function timeToMoment(time) {
  //time in hh:mm format to a Moment object
  const splittedTime = time.split(":");
  return moment(BASE_DATE).hours(splittedTime[0]).minute(splittedTime[1]);
}

function timeToSliderValue(time) {
  //makes moment from basedate and sets hr and min to that time
  //calc diff from 12AM, makes that a perctage
  return (timeToMoment(time).diff(moment(BASE_DATE), "hours", true) / 24) * 100;
}

function sliderValueToTime(sliderValue) {
  return moment(BASE_DATE)
    .add((sliderValue / 100) * 24, "hours")
    .format("hh:mm");
}

function valueLabelFormat(value) {
  //slider to valuetime
  return timeToMoment(sliderValueToTime(value)).format("h:mm a");
}

function getThirty(curVal) {
  //make array of all the times, map over them and convert that time to
}

const StyledSlider = styled(Slider)({});

function MySlider({ availability }) {
  const [value, setValue] = useState(
    typeof availability == "boolean"
      ? [0, 100]
      : availability.split("-").map((t) => timeToSliderValue(t))
  );

  return (
    <StyledSlider
      disabled={availability === false}
      valueLabelDisplay="on"
      onChange={(e, newValue) => setValue(newValue)}
      defaultValue={value}
      valueLabelFormat={valueLabelFormat}
      step={getThirty(value[0])}
    />
  );
}

export default MySlider;
