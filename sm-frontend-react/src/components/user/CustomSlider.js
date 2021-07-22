import React from "react";
import { Switch, Slider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";

const timeCrap = () => {
  let t = new Date();
  t.setHours(0, 0, 0, 0);
  t.setHours(7);
  let x = [];
  while (t.getHours() <= 22) {
    x.push(new Date(t));
    t.setMinutes(t.getMinutes() + 30);
  }
  return x;
};

const dtToMarks = (y) => {
  /*takes what timeCrap returns*/
  const marks = y.map((time) => {
    if (time === y[0]) {
      return { value: (y.indexOf(time) / y.length) * 100, label: "7:00AM" };
    } else if (time === y[y.length - 1]) {
      return { value: (y.indexOf(time) / y.length) * 100, label: "11:30PM" };
    } else if (time.getHours() === 16 && time.getMinutes() === 0) {
      return { value: (y.indexOf(time) / y.length) * 100, label: "4:00PM" };
    }
    return { value: (y.indexOf(time) / y.length) * 100 };
  });
  return marks;
};

const styles = () => ({
  avBlock: {
    margin: "20px",
    display: "flex",
    flexWrap: "wrap",
    borderRadius: "5px",
    alignItems: "center",
    justifyContent: "center",
    transition: "all .3s ease-in-out",
  },
  slider: {
    width: "70%",
    leftMargin: "10px",
    rightMargin: "10px",
  },
});

const CustomSlider = ({
  classes,
  name,
  valueToTime,
  handleSwitch,
  handleSlider,
  checked,
  value,
}) => {
  const marks = dtToMarks(timeCrap());
  return (
    <div
      className={classes.avBlock}
      style={
        checked
          ? { border: "1px solid #00BBFF" }
          : { border: "1px solid black" }
      }
    >
      <Typography>{name.toUpperCase() + name.slice(1)}</Typography>
      <Switch checked={checked} onChange={handleSwitch} name={name} />
      {checked ? (
        <Fade in={checked}>
          <Slider
            key={name}
            defaultValue={value}
            marks={marks}
            valueLabelFormat={(value) => valueToTime(value)}
            step={null}
            className={classes.slider}
            valueLabelDisplay="auto"
            onChangeCommitted={(e, new_value) =>
              handleSlider(e, new_value, name)
            }
          />
        </Fade>
      ) : null}
    </div>
  );
};

export default withStyles(styles)(CustomSlider);
