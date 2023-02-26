import React from "react";
import editIcon from "./assets/Edit Icon.svg";
import dragIcon from "./assets/Drag Icon.svg";
import "./HelpPrompt.css";
import { Divider } from "@mui/material";
import styled from "@emotion/styled";

function HelpItem({ children }) {
  const { img, header, content } = children;
  return (
    <div className="help-item">
      <div>{img}</div>
      <div>
        <h3>{header}</h3>
        <p>{content}</p>
      </div>
    </div>
  );
}

const StyledDivider = styled(Divider)({
  margin: "20px 0px",
  background: "black",
  opacity: 0.12,
  height: "1px",
});

function HelpPrompt({ currentFunction, name }) {
  return (
    <div
      style={{
        display: currentFunction === name ? "flex" : "none",
      }}
      className="prompt help-prompt"
    >
      <h1>Let me help you out a bit</h1>

      <h4>To adjust the time each team member is scheduled for:</h4>

      <HelpItem>
        {{
          img: <img className="drag-icon" alt="Drag" src={dragIcon} />,
          header: "Drag/Spread",
          content:
            "Drag the spread indicators to stretch or expand each team member's work time.",
        }}
      </HelpItem>
      <StyledDivider />
      <HelpItem>
        {{
          img: <img style={{ marginTop: 50 }} alt="Select" src={editIcon} />,
          header: "Select",
          content: "Select a team member's time to manually enter their time.",
        }}
      </HelpItem>
      <StyledDivider />
    </div>
  );
}

export default HelpPrompt;
