import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";

const MySwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "white",
    "&:hover": {
      backgroundColor: "white",
    },
  },
  "& .MuiSwitch-track": {
    backgroundColor: "#275C78",
  },
  width: 200,
}));

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function ColorSwitches() {
  return (
    <div style={{}}>
      <Switch {...label} defaultChecked />
      <Switch {...label} defaultChecked color="secondary" />
      <Switch {...label} defaultChecked color="warning" />
      <Switch {...label} defaultChecked color="default" />
      <MySwitch defaultChecked />
    </div>
  );
}
