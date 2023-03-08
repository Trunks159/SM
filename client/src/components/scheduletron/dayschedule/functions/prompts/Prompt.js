import React from "react";
import HelpPrompt from "./HelpPrompt/HelpPrompt";
import TeamPrompt from "./TeamPrompt/TeamPrompt";
import SavePrompt from "./SavePrompt/SavePrompt";
import "./prompt.css";

function promptSwitch({
  currentFunction,
  handleProfileChange,
  profile,
  isReadOnly,
  readOnlyWarning,
}) {
  return {
    help: <HelpPrompt />,
    team: (
      <TeamPrompt
        handleProfileChange={handleProfileChange}
        profile={profile}
        isReadOnly={isReadOnly}
        readOnlyWarning={readOnlyWarning}
      />
    ),
    save: (
      <SavePrompt isReadOnly={isReadOnly} readOnlyWarning={readOnlyWarning} />
    ),
  }[currentFunction];
}

function Prompt(props) {
  return <div className="prompt">{promptSwitch(props)} </div>;
}

export default Prompt;
