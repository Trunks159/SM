import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    height: 500,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

const marks = [
  {
    value: 0,
    label: "0°C",
  },
  {
    value: 20,
    label: "20°C",
  },
  {
    value: 37,
    label: "37°C",
  },
  {
    value: 100,
    label: "100°C",
  },
];

export default function VerticalSlider() {
  const classes = useStyles();

  return (
    <div id="di" className={classes.root}>
      <Slider
        valueLabelDisplay="on"
        orientation="vertical"
        defaultValue={[20, 37]}
        aria-labelledby="vertical-slider"
        getAriaValueText={valuetext}
        marks={marks}
      />
    </div>
  );
}

/*
const times = [
  "7:00AM",
  "8:00AM",
  "9:00AM",
  "10:00AM",
  "11:00AM",
  "12:00PM",
  "1:00PM",
  "2:00PM",
  "3:00PM",
  "4:00PM",
  "5:00PM",
  "6:00PM",
  "7:00PM",
  "8:00PM",
  "9:00PM",
  "10:00PM",
  "11:00PM",
];

let c = 0;
for (let i = 700; i <= 2300; i += 100) {
  marks.push({ value: i, label: times[c] });
  c++;
}
*/
