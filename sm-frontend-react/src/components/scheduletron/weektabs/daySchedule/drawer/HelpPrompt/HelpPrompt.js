import React from "react";
import editIcon from "./assets/Edit Icon.svg";
import dragIcon from "./assets/Drag Icon.svg";
import "./HelpPrompt.css";

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

function HelpPrompt({ currentFunction, name }) {
  return (
    <div
      style={{
        display: currentFunction === name ? "flex" : "none",
        flexDirection: "column",
      }}
    >
      <h2 style={{ fontWeight: "lighter" }}>Let me help you out a bit</h2>

      <p style={{ opacity: 0.6 }}>
        To adjust the time each team member is scheduled for:
      </p>

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
