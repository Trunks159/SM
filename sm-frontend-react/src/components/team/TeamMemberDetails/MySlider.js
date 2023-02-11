import styled from "@emotion/styled";
import { Slider } from "@mui/material";
import React, { useState } from "react";
import moment from "moment";
import { fontSize } from "@mui/system";

const BASE_DATE = "1970-01-01 00:00";

//slideval to time needs to round
//so if its

function roundToNearestThirty(time) {
  const momentTime = timeToMoment(time);

  const start = momentTime.clone().minutes(0).second(0).millisecond(0);
  const timesToRoundTo = [
    start.clone(),
    start.clone().add(30, "minutes"),
    start.clone().add(1, "hours"),
  ];

  const differences = timesToRoundTo.map((item) =>
    Math.abs(item.diff(momentTime, "minutes", true))
  );

  const index = differences.indexOf(Math.min(...differences));
  return timesToRoundTo[index].format();
}

function timeToMoment(time) {
  //time in HH:mm format to a Moment object
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
    .format("HH:mm");
}

function valueLabelFormat(value) {
  //slider to valuetime
  return moment(roundToNearestThirty(sliderValueToTime(value))).format(
    "h:mm a"
  );
}

const StyledSlider = styled(Slider)({
    color : '#6200EE',
    '& .MuiSlider-valueLabel':{
        background : 'none',
        color : '#707070',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        padding : 0,
        fontWeight : 'normal',
        fontSize  : 9

    }
});

function MySlider({ availability }) {
  const step = (0.5 / 24) * 100;
  const [value, setValue] = useState(
    typeof availability == "boolean"
      ? [0, 100]
      : availability.split("-").map((t) => timeToSliderValue(t))
  );

  console.log("Value: ", value);
  return (
    <StyledSlider
      disabled={availability === false}
      valueLabelDisplay="on"
      onChange={(e, newValue) => setValue(newValue)}
      defaultValue={value}
      valueLabelFormat={valueLabelFormat}
      step={step}
    />
  );
}

export default MySlider;
