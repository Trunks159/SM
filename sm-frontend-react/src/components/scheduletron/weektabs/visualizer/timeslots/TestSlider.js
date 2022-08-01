import React from "react";
import { Slider } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

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

const TestSlider = () => {
  return (
    <StyledSlider
      /*I changed name to id so watch out bro */
      defaultValue={[0, 50]}
      valueLabelDisplay="auto"
    />
  );
};

export default TestSlider;
