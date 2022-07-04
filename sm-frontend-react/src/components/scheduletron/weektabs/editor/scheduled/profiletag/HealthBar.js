import React from "react";
import { LinearProgress, styled } from "@material-ui/core";

const StyledProgressBar = styled(LinearProgress)({
  height: 13,
  borderRadius: 7,
  minWidth:100,
  "& .MuiLinearProgress-colorPrimary": {
    backgroundColor: "#FFFFFF",
  },
  "& .MuiLinearProgress-colorSecondary": {
    backgroundColor: "#FFFFFF",
  },
  "& .MuiLinearProgress-bar": {
    borderRadius: 5,
  },
  "& .MuiLinearProgress-barColorPrimary": {
    backgroundColor: "#5EFF00",
  },
  "& .MuiLinearProgress-barColorSecondary": {
    backgroundColor: "#FFFF00",
  },
});

const HealthBar = ({ shiftHealth, className }) => {
  return (
    <StyledProgressBar
      color={shiftHealth >= 0.7 ? "primary" : "secondary"}
      variant="buffer"
      value={shiftHealth * 100}
      className = {className}
    />
  );
};

export default HealthBar;