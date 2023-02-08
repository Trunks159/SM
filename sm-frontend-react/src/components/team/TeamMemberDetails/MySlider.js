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
  return (moment(time).diff(moment(BASE_DATE), "hours", true) / 24) * 100;
}

function sliderValueToTime(sliderValue) {
  return moment(BASE_DATE)
    .add((sliderValue / 100) * 24, "hours")
    .format();
}

function valueLabelFormat(value) {
  //slider to valuetime
  console.log('Yomama: ',value)
  return moment(sliderValueToTime(value)).format("h:mm a");
}

const StyledSlider = styled(Slider)({});
//make a date and use it

function translateNoAndAlwaysAvailable(availability) {
  if (availability === true) {
    //make moments and set times to
    return [0, 100];
  } else if (Array.isArray(availability)) {
    return false;
  }
  return [0, 50];
}

function MySlider({ defaultAvailability }) {
  const x = translateNoAndAlwaysAvailable(defaultAvailability);

  const [availability, setAvailability] = useState(
    translateNoAndAlwaysAvailable(defaultAvailability) ||
      defaultAvailability.map((t) => timeToSliderValue(t))
  );

  console.log("Default: ", availability);
  return (
    <StyledSlider
      valueLabelDisplay="on"
      onChange={(e, newValue) => setAvailability(newValue)}
      defaultValue={availability}
      valueLabelFormat = {valueLabelFormat}
    />
  );
}

export default MySlider;
