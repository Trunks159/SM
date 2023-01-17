import React from "react";
import editIcon from "./assets/Edit Icon.svg";
import dragIcon from "./assets/Drag Icon.svg";

function HelpItem({ img, children }) {
  return (
    <div style={{ display: "flex", margin: 20 }}>
      <div style={{ width: "30%" }}>{img}</div>
      <div style={{ flex: 1 }}>
        <h2>{children.header}</h2>
        <p>{children.content}</p>
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
      <h3>Let me help you out a bit</h3>

      <h6>To adjust the time each team member is scheduled for:</h6>
      <HelpItem
        img={
          <img
            alt="Drag"
            src={dragIcon}
            style={{
              width: 15,
              background: "rgba(0,0,0,.56)",
              alignSelf: "start",
              padding: "8px 12px",
              borderRadius: 3,
              marginTop: 50,
            }}
          />
        }
      >
        {{
          header: "Drag/Spread",
          content:
            "Drag the spread indicators to stretch or expand each team member's work time.",
        }}
      </HelpItem>
      <HelpItem img={<img alt="Edit" src={editIcon} />}>
        {{
          header: "Select",
          content: "Select a team member's time to manually enter their time.",
        }}
      </HelpItem>
    </div>
  );
}

export default HelpPrompt;
