import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import dayIcon from "../../../../assets/images/Day Icon Desktop.svg";
import nightIcon from "../../../../assets/images/Night Icon Desktop.svg";

const MySwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    transform: "translateX(20px)",
    color: "white",
  },
  "& .MuiSwitch-track": {
    transform: "translateX(-13px)",
    backgroundColor: "#275C78",
  },
  "& .MuiSwitch-thumb": {
    width : 9,
    height : 9,
    backgroundColor:'white'
  },
  width: 70,
  margin: 0,
}));

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function ColorSwitches() {
  return (
    <div style={{display : 'flex', marginLeft : 'auto'}}>
      <div style={{ display: "flex", alignItems: "center", marginLeft : 'auto' }}>
        <img style={{ marginTop: 4 }} src={dayIcon} />
        <MySwitch />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img style={{ marginTop: 4 }} src={nightIcon} />
        <MySwitch />
      </div>
    </div>
  );
}
