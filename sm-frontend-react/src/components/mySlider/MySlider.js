import React from "react";
import { Slider } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { valueToDt, miliToReg, getMarks } from "./TimeFunctions";

const StyledSlider = styled(Slider)({
  width: 145,
  margin: 0,
  color: "#328F83",
  "& .MuiSlider-thumb": {
    backgroundColor: "#328F83",
    width: 15,
    height: 15,
  },
  "& .MuiSlider-mark": {
    height: 0,
  },
  "& .MuiSlider-track": {
    height: 3,
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 10,
    backgroundColor: "unset",
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-markLabel": {
    top: 0,
    fontSize: 10,
  },
});

const MySlider = ({ id, handleSlider, value }) => {
  return (
    <StyledSlider
      /*I changed name to id so watch out bro */
      key={id}
      defaultValue={value}
      marks={getMarks()}
      valueLabelFormat={(value) =>
        miliToReg(valueToDt(value).toTimeString().slice(0, 5))
      }
      step={null}
      valueLabelDisplay="auto"
      onChangeCommitted={(e, new_value) => handleSlider(e, new_value, id)}
    />
  );
};

export default MySlider;
