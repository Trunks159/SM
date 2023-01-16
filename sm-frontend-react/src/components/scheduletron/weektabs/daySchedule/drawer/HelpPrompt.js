import React from "react";

function HelpPrompt({ currentFunction, name }) {
  return (
    <div style={{ display: currentFunction === name ? "flex" : "none" }}>
      Help me help you
    </div>
  );
}

export default HelpPrompt;
