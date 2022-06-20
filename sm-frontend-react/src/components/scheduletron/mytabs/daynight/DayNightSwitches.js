import React from "react";
import Switch from "@mui/material/Switch";
import dayIcon from "../../../../assets/images/Day Icon Desktop.svg";
import nightIcon from "../../../../assets/images/Night Icon Desktop.svg";

export default function BasicSwitches() {
  return (
    <div>
      <button className="switch-button">
        <img src={dayIcon} />
        <Switch defaultChecked />
      </button>
      <button className="switch-button">
        <img src={nightIcon} />
        <Switch defaultChecked />
      </button>
    </div>
  );
}
