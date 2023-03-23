import { Button, Divider, Fade } from "@mui/material";
import React from "react";
import alphaIcon from "./assets/Alphabetical Icon.svg";

function AlphaButton({ handleSort, active }) {
  return (
    <Button
      sx={{ position: "relative", background: "none" }}
      onClick={handleSort}
    >
      <img
        style={{
          filter: active
            ? "invert(43%) sepia(59%) saturate(965%) hue-rotate(151deg) brightness(92%) contrast(95%)"
            : "none",
          width: "2rem",
          transitionDuration: ".2s",
        }}
        src={alphaIcon}
      />
      <Fade in={active}>
        <svg height="1" width="10" style={{ position: "absolute", bottom: 0 }}>
          <line
            x1="0"
            y1="0"
            x2="100%"
            y2="0"
            style={{ stroke: "#0792B6", strokeWidth: 2 }}
            strokeLinecap="round"
          />
        </svg>
      </Fade>
    </Button>
  );
}

export default AlphaButton;
