import React from "react";
import editIcon from "./assets/Edit Icon.svg";
import dragIcon from "./assets/Drag Icon.svg";
import "./HelpPrompt.css";
import { Typography } from "@mui/material";

function HelpItem({ children }) {
  const { img, header, content } = children;
  return (
    <div className="help-item">
      <div>{img}</div>
      <div>
        <Typography variant="body1">{header}</Typography>
        <Typography variant="caption">{content}</Typography>
      </div>
    </div>
  );
}

function HelpPrompt({ currentFunction, name }) {
  return (
    <div
      style={{
        display: currentFunction === name ? "flex" : "none",
        flexDirection: "column",
      }}
    >
      <Typography variant = 'subtitle1' style = {{margin : '15px 0px'}}>Let me help you out a bit</Typography>

      <Typography variant="subtitle2" style={{  }}>
        To adjust the time each team member is scheduled for:
      </Typography>

      <HelpItem>
        {{
          img: <img className="drag-icon" alt="Drag" src={dragIcon} />,
          header: "Drag/Spread",
          content:
            "Drag the spread indicators to stretch or expand each team member's work time.",
        }}
      </HelpItem>
      <HelpItem>
        {{
          img: <img style={{ marginTop: 50 }} alt="Select" src={editIcon} />,
          header: "Select",
          content: "Select a team member's time to manually enter their time.",
        }}
      </HelpItem>
    </div>
  );
}

export default HelpPrompt;
