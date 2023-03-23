import styled from "@emotion/styled";
import { Slider } from "@mui/material";
import React from "react";
import { valueLabelFormat } from "./TimeConversions";

const StyledSlider = styled(Slider)({
  color: "#6200EE",
  width: "80%",
  marginLeft: "auto",
  marginRight: "auto",
  height: 2,
  "& .MuiSlider-valueLabel": {
    background: "none",
    color: "#707070",
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    padding: 0,
    fontWeight: "normal",
    fontSize: 10,
    top: 35,
  },
  padding: -10,
});

function MySlider({ value, disabled, handleSlideSwitch, index }) {
  return (
    <StyledSlider
      disabled={disabled}
      valueLabelDisplay="on"
      onChange={(e, newValue) => handleSlideSwitch(index, newValue)}
      value={value}
      valueLabelFormat={valueLabelFormat}
      step={(0.5 / 24) * 100}
    />
  );
}

export default MySlider;
