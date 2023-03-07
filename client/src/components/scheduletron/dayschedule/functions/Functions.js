import React, { useState } from "react";
import blackHelpIcon from "./assets/Black Help Icon.svg";
import blackAddIcon from "./assets/Black Add Icon.svg";
import blackSaveIcon from "./assets/Black Save Icon.svg";
import blackTeamIcon from "./assets/Black Team Icon.svg";
import helpIcon from "./assets/Help Icon.svg";
import teamIcon from "./assets/Team Icon.svg";
import saveIcon from "./assets/Save Icon.svg";
import styled from "@emotion/styled";
import { Button, Tabs, Tab, Paper, Fade, Drawer } from "@mui/material";
import TheDrawer from "./drawer/TheDrawer";
import { useSelector } from "react-redux";
import "./functions.css";

const isString = (item) => typeof item === "string" || item instanceof String;

const StyledTabs = styled(Tabs)(({ value, hidden, orientation }) => {
  return {
    background: value ? "rgba(46, 58, 64, 1)" : "none",

    "& .MuiTabs-indicator": {
      background: "white",
      right: 0,
    },

    "& .Mui-selected": {
      opacity: 1,
    },
    "& .MuiTabs-flexContainer": {
      justifyContent:
        orientation === "vertical" ? "flex-start" : "space-evenly",
    },

    color: isString(value) ? "white" : "black",
    width: orientation === "vertical" ? "max-content" : "100%",
    minWidth: 90,
  };
});

const StyledTab = styled(Tab)({
  textTransform: "none",
  transitionDuration: ".2s",
  minWidth: 0,
  fontSize: 12,
  fontWeight: 400,
  opacity: 0.7,
  "& .tab-label": {
    opacity: 0,
    transitionDuration: ".2s",
  },
  "& .MuiTab-iconWrapper": {
    marginBottom: 8,
  },
  "&.Mui-selected": {
    fontSize: 12,
    color: "white",
    "& .tab-label": {
      opacity: 1,
    },
  },
  "&:hover": {
    opacity: 1,
  },
});

const MyPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  position: "relative",
  alignItems: "center",
  borderRadius: 0,
  [theme.breakpoints.down("sm")]: {
    background: "#2E3A40",
  },
}));

function Functions({
  currentFunction,
  changeCurrentFunction,
  hidden,
  isReadOnly,
  date,
}) {
  const isOpen = isString(currentFunction);
  const screenWidth = useSelector((state) => state.screenWidth);
  const isDesktop = screenWidth >= 600;
  return (
    <div
      className={`functions-main${
        currentFunction ? " functions-main-open" : ""
      }`}
    >
      <TheDrawer
        isReadOnly={isReadOnly}
        date={date}
        changeCurrentFunction={changeCurrentFunction}
        currentFunction={currentFunction}
        isDesktop={isDesktop}
      />

      <MyPaper>
        <StyledTabs
          onChange={(e, newVal) => changeCurrentFunction(newVal)}
          value={currentFunction}
          orientation={isDesktop ? "vertical" : "horizontal"}
          hidden={hidden}
        >
          <StyledTab
            value={"help"}
            label={<span className="tab-label">Team</span>}
            icon={
              <img
                alt="Help"
                src={isOpen || !isDesktop ? helpIcon : blackHelpIcon}
              />
            }
          />
          <StyledTab
            value={"team"}
            label={<span className="tab-label">Team</span>}
            icon={
              <img
                alt="Team"
                src={isOpen || !isDesktop ? teamIcon : blackTeamIcon}
              />
            }
          />
          <StyledTab
            value={"save"}
            label={<span className="tab-label">Team</span>}
            icon={
              <img
                alt="Save"
                src={isOpen || !isDesktop ? saveIcon : blackSaveIcon}
              />
            }
          />
          <Tab value={null} style={{ display: "none" }} />
        </StyledTabs>
      </MyPaper>
    </div>
  );
}

export default Functions;
