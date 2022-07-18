import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { makeStyles } from "@material-ui/core";
import FunctionsDrawer from "./FunctionsDrawer";
import visualizerIcon from "./assets/Visualizer Icon.svg";
import editorIcon from "./assets/Editor Icon.svg";
import metricsIcon from "./assets/Metrics Icon.svg";
import saveIcon from "./assets/Save Icon.svg";
import visualizerIconInactive from "./assets/Visualizer Icon Inactive.svg";
import editorIconInactive from "./assets/Editor Icon Inactive.svg";
import metricsIconInactive from "./assets/Metrics Icon Inactive.svg";
import saveIconInactive from "./assets/Save Icon Inactive.svg";
import "./functions.css";

const useStyles = makeStyles({
  tabs: {
    "@media(min-width : 600px)": {
      border: "none",
      "& .MuiTabs-flexContainer": {
        justifyContent: "space-evenly",
      },
      width: 56,
      "& .MuiTabs-indicator": {
        left: 0,
      },
      height: "100%",
    },

    "& .MuiTabs-indicator": {
      background: "#54DCF2",
    },
    "& .MuiTabs-flexContainer": {
      justifyContent: "space-evenly",
    },
    overflowX: "auto",
    minWidth: 0,
    alignItems: "center",
  },
  tab: {
    minWidth: 0,
    flex: 1,
  },
});

export default function Functions({
  isDesktop,
  currentFunction,
  setCurrentFunction,
}) {
  const classes = useStyles();
  const tabIcons = [
    { active: visualizerIcon, inactive: visualizerIconInactive },
    { active: editorIcon, inactive: editorIconInactive },
    { active: metricsIcon, inactive: metricsIconInactive },
    { active: saveIcon, inactive: saveIconInactive },
  ];
  return (
    <Tabs
      className={classes.tabs}
      value={currentFunction}
      orientation={isDesktop ? "vertical" : "horizontal"}
      onChange={setCurrentFunction}
      aria-label="basic tabs example"
      sx={{
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      {tabIcons.map((icons, index) => {
        const isActive = index === currentFunction;
        return (
          <Tab
            className={classes.tab}
            value={index}
            style={{
              transition: ".2s",
              opacity: 1,
              height: 70,
              padding: "15px 10px",
            }}
            icon={
              <img
                style={{
                  width: isActive ? 42 : 33,
                  transitionDuration: ".2s",
                }}
                src={isActive ? icons.active : icons.inactive}
              />
            }
          />
        );
      })}
    </Tabs>
  );
}
