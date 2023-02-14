import styled from "@emotion/styled";
import { Slider } from "@mui/material";
import React from "react";
import { valueLabelFormat } from "./TimeFunctions";

const StyledSlider = styled(Slider)({
  color: "#6200EE",
  "& .MuiSlider-valueLabel": {
    background: "none",
    color: "#707070",
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    padding: 0,
    fontWeight: "normal",
    fontSize: 9,
  },
});

function MySlider({ value, disabled, handleSlider, index }) {
  return (
    <StyledSlider
      disabled={disabled}
      valueLabelDisplay="on"
      onChange={(e, newValue) => handleSlider(index, newValue)}
      defaultValue={value}
      valueLabelFormat={valueLabelFormat}
      step={(0.5 / 24) * 100}
    />
  );
}

export default MySlider;
