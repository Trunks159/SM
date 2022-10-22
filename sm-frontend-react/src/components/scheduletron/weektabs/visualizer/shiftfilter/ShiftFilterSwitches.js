import React from "react";
import { styled } from "@material-ui/core";
import Switch from '@mui/material/Switch';
import dayIcon from "../../../../../assets/images/Day Icon Desktop.svg";
import nightIcon from "../../../../../assets/images/Night Icon Desktop.svg";

const MySwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    transform: "translateX(20px)",
    color: "white",
  },
  "& .MuiSwitch-track": {
    transform: "translateX(-13px)",
    backgroundColor: "#275C78",
  },
  "& .MuiSwitch-thumb": {
    width: 9.5,
    height: 9.5,
    backgroundColor: "white",
    boxShadow: "none",
  },
  width: 70,
}));

export default function ColorSwitches({ handleSwitch, shiftFilter }) {
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
      >
        <img style={{ marginTop: 4 }} src={dayIcon} />
        <MySwitch
          checked={shiftFilter.day}
          onChange={(e, newValue) => handleSwitch(newValue, "day")}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img style={{ marginTop: 4 }} src={nightIcon} />
        <MySwitch
          checked={shiftFilter.night}
          onChange={(e, newValue) => handleSwitch(newValue, "night")}
        />
      </div>
    </div>
  );
}
