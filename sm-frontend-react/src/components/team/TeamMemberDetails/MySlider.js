import styled from "@emotion/styled";
import { Slider } from "@mui/material";
import React, { useState } from "react";
import moment from "moment";

const BASE_DATE = "1970-01-01 00";
/*
So we need perc to time and time to perc
if times come in convert them to perc
if false, turn slider off and set values to 0,100
if true , max and min are set to 0 and 100
*/

function timeToSliderValue(time) {
  //take time and convert to a number between 0 and 100
  //take time that comes in and make a moment , set it to 12AM
  //add a day to that
  //find difference in all of that
  //compare that to the difference between input time and such
  const momentTime = moment(time);
  const start = momentTime.hour(0).minute(0);
  const end = start.add(1, "days");
  return (
    (momentTime.diff(start, "hours", true) / end.diff(start, "hours", true)) *
    100
  );
}

function sliderValueToTime(sliderValue) {}

const StyledSlider = styled(Slider)({});
//make a date and use it

function setDefaultSliderValues(availability) {
  if (availability === true) {
    //make moments and set times to
    return [0, 100];
  } else if (Array.isArray(availability)) {
    return availability.map((time) => timeToSliderValue(time));
  }
  return [0, 50];
}

function MySlider({ defaultAvailability }) {
  const [availability, setAvailability] = useState([]);
  return <StyledSlider />;
}

export default MySlider;
