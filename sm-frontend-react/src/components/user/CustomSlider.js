import React from "react";
import { Switch, Slider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import { valueToDt, miliToReg } from "./TimeFunctions";

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
  handleSwitch,
  handleSlider,
  checked,
  value,
  marks,
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
          <Slider
            key={name}
            defaultValue={value}
            marks={marks}
            valueLabelFormat={(value) =>
              miliToReg(valueToDt(value).toTimeString().slice(0, 5))
            }
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
