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

function SlideSwitch({ weekday, index, available, value, handleSlideSwitch }) {
  //when checked on,
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <h5>{weekday}</h5>
        <StyledSwitch
          control={
            <Switch
              checked={available}
              onChange={(e) => handleSlideSwitch(index, e.target.checked)}
            />
          }
          label={available ? "I am available" : "Not available"}
        />
      </div>

      <MySlider
        index={index}
        disabled={!available}
        value={value}
        handleSlideSwitch={handleSlideSwitch}
      />
    </>
  );
}

export default SlideSwitch;
