import React from "react";
import { Slider } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { valueToDt, miliToReg, getMarks } from "../../../../../TimeFunctions";

const StyledSlider = styled(Slider)({
  margin: 0,
  padding: 0,
  color: "#2178A6",
  position: "relative",
  "& .MuiSlider-thumb": {
    backgroundColor: "#2178A6",
    width: 12,
    height: 12,
  },
  "& .MuiSlider-mark": {
    height: 0,
  },
  "& .MuiSlider-track": {
    height: 2,
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 10,
    backgroundColor: "unset",
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-markLabel": {
    top: -15,
    fontSize: 10,
  },
});

const MySlider = ({ userId, handleSlider, value, classes }) => {
  return (
    <StyledSlider
      /*I changed name to id so watch out bro */
      className={classes}
      defaultValue={[0, 50]}
      value={value}
      marks={getMarks()}
      valueLabelFormat={(value) =>
        miliToReg(valueToDt(value).toTimeString().slice(0, 5))
      }
      step={null}
      valueLabelDisplay="auto"
      onChange={(e, new_value) => handleSlider(new_value, userId)}
    />
  );
};

export default MySlider;
