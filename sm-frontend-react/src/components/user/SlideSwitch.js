import React from "react";
import { Switch, Slider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import MySlider from "../mySlider/MySlider";

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

const SlideSwitch = ({
  classes,
  name,
  handleSwitch,
  handleSlider,
  checked,
  value,
}) => {
  return (
    <div
      className={classes.avBlock}
      style={
        checked
          ? { border: "1px solid #00BBFF" }
          : { border: "1px solid black" }
      }
    >
      <Typography>{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
      <Switch checked={checked} onChange={handleSwitch} name={name} />
      {checked ? (
        <Fade in={checked}>
          <MySlider
            key={name}
            defaultValue={value}
            handleSlider = {handleSlider}
            step={null}
            classes={classes}
          />
        </Fade>
      ) : null}
    </div>
  );
};

export default withStyles(styles)(SlideSwitch);
