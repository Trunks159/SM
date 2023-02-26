import React from "react";
import MySlider from "./MySlider";
import { FormControlLabel, Switch } from "@mui/material";
import styled from "@emotion/styled";

const StyledSwitch = styled(FormControlLabel)({
  "& .MuiTypography-root": {
    fontSize: 14,
    color: "black",
  },

  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#6200EE",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#6200EE",
  },
});

function SlideSwitch({
  weekday,
  index,
  isAvailable,
  value,
  handleSlideSwitch,
}) {
  //when checked on,
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <h5>{weekday}</h5>
        <StyledSwitch
          control={
            <Switch
              checked={isAvailable}
              onChange={(e) => handleSlideSwitch(index, e.target.checked)}
            />
          }
          label={isAvailable ? "I am available" : "Not available"}
        />
      </div>

      <MySlider
        index={index}
        disabled={!isAvailable}
        value={value}
        handleSlideSwitch={handleSlideSwitch}
      />
    </>
  );
}

export default SlideSwitch;
