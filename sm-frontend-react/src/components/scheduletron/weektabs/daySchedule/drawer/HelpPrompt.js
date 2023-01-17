import React from "react";
import editIcon from "./assets/Edit Icon.svg";
import dragIcon from "./assets/Drag Icon.svg";

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
      <div style={{ display: "flex" , background : 'red',}}>
        <img
          alt="Drag"
          src={dragIcon}
          style={{
            width: 15,
            background: "rgba(0,0,0,.56)",
            alignSelf: "start",
            marginTop: 30,
            padding: "8px 12px",
            borderRadius: 3,
          }}
        />
        <div>
          <h2>Drag/Spread</h2>
          <p>
            Drag the spread indicators to stretch or expand each team member's
            work time.
          </p>
        </div>
      </div>
      <div>
        <img alt="Edit" src={editIcon} />
        <div>
          <h2>Select</h2>
          <p>Select a team member's time to manually enter their time.</p>
        </div>
      </div>
    </div>
  );
}

export default HelpPrompt;
