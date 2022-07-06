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
    "& .MuiTabs-indicator": {
      left: 0,
    },
    "& .MuiTabs-flexContainer": {
      width: 60,
      alignItems: "center",
    },
    flexShrink: 0,
  },
  tabsDesktop: {
    "& .MuiTabs-indicator": {
      right: 0,
    },
    "& .MuiTabs-flexContainer": {
      width: 70,
      alignItems: "center",
    },
    flexShrink: 0,
  },
});

export default function Functions({
  isDesktop,
  currentFunction,
  setCurrentFunction,
}) {
  const classes = useStyles();
  return isDesktop ? (
    <Tabs
      className={classes.tabsDesktop}
      value={currentFunction}
      orientation={"vertical"}
      onChange={setCurrentFunction}
      aria-label="basic tabs example"
      sx={{
        borderRight: 1,
        borderColor: "divider",
      }}
    >
      <Tab
        value={0}
        icon={
          <img
            src={
              currentFunction === 0 ? visualizerIcon : visualizerIconInactive
            }
          />
        }
      />
      <Tab
        value={1}
        icon={
          <img src={currentFunction === 1 ? editorIcon : editorIconInactive} />
        }
      />
      <Tab
        value={2}
        icon={
          <img
            src={currentFunction === 2 ? metricsIcon : metricsIconInactive}
          />
        }
      />
      <Tab
        value={3}
        icon={<img src={currentFunction === 3 ? saveIcon : saveIconInactive} />}
      />
    </Tabs>
  ) : (
    <FunctionsDrawer>
      <Tabs
        className={classes.tabs}
        value={currentFunction}
        orientation={"vertical"}
        onChange={setCurrentFunction}
        aria-label="basic tabs example"
        sx={{
          borderLeft: 1,
          borderColor: "divider",
        }}
      >
        <Tab
          value={0}
          icon={
            <img
              src={
                currentFunction === 0 ? visualizerIcon : visualizerIconInactive
              }
            />
          }
        />
        <Tab
          value={1}
          icon={
            <img
              src={currentFunction === 1 ? editorIcon : editorIconInactive}
            />
          }
        />
        <Tab
          value={2}
          icon={
            <img
              src={currentFunction === 2 ? metricsIcon : metricsIconInactive}
            />
          }
        />
        <Tab
          value={3}
          icon={
            <img src={currentFunction === 3 ? saveIcon : saveIconInactive} />
          }
        />
      </Tabs>
    </FunctionsDrawer>
  );
}
