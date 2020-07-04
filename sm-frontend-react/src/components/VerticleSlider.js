import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const f = (x) => {
  x = x * 0.01;
  const range = [7, 23];
  const time_range = range[1] - range[0];
  let hours = time_range * x;
  return hours + range[0];
};

const y = (x) => {
  var sec_num = parseInt(x, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return hours + ":" + minutes;
};

const timetoValue = (time) => {
  const time_range = [700, 2300];
  const time_delta = time_range[1] - time_range[0];
  const x = time - time_range[0];
  return (x / time_delta) * 100;
};

const valueToTime = (value) => y(f(value) * 3600);

const useStyles = makeStyles({
  root: {
    height: 500,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

const marks = [];
let times = [];
for (let time = 700; time <= 2300; time += 50) {
  marks.push({
    value: timetoValue(time),
  });
}

const VerticalSlider = ({ name }) => {
  const classes = useStyles();

  return (
    <div id="di" className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        {name}
      </Typography>
      <Slider
        valueLabelDisplay="auto"
        valueLabelFormat={(x) => valueToTime(x)}
        orientation="vertical"
        defaultValue={[20, 37]}
        aria-labelledby="vertical-slider"
        getAriaValueText={valuetext}
        marks={marks}
        step={null}
      />
    </div>
  );
};
export default VerticalSlider;

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
