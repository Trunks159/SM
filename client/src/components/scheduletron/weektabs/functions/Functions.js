import React, { useState } from "react";
import blackHelpIcon from "./assets/Black Help Icon.svg";
import blackAddIcon from "./assets/Black Add Icon.svg";
import blackSaveIcon from "./assets/Black Save Icon.svg";
import blackTeamIcon from "./assets/Black Team Icon.svg";
import helpIcon from "./assets/Help Icon.svg";
import teamIcon from "./assets/Team Icon.svg";
import saveIcon from "./assets/Save Icon.svg";
import styled from "@emotion/styled";
import { Button, Collapse, Tabs, Tab, Paper } from "@mui/material";
import TheDrawer from "../daySchedule/drawer/TheDrawer";

const isString = (item) => typeof item === "string" || item instanceof String;

const StyledTabs = styled(Tabs)(({ value, hidden }) => {
  return {
    "& .MuiTabs-indicator": {
      background: "white",
      right: 0,
    },

    "& .Mui-selected": {
      opacity: 1,
    },
    "& .MuiTabs-flexContainer": {},
    opacity: 0.7,
    color: isString(value) ? "white" : "black",
    width: 90,
    minWidth: 90,
  };
});

const StyledTab = styled(Tab)({
  textTransform: "none",
  transitionDuration: ".25s",
  minWidth: 0,
  fontSize: 0,
  fontWeight: 400,
  opacity: 0.7,
  "& .MuiTab-iconWrapper": {
    marginBottom: 8,
  },
  "&.Mui-selected": {
    fontSize: 12,
  },
  "&:hover": {
    opacity: 1,
  },
});

function Functions({
  currentFunction,
  changeCurrentFunction,
  hidden,
  isReadOnly,
  date,
}) {
  const isOpen = isString(currentFunction);
  return (
    <Paper
      style={{
        display: "flex",
        marginLeft: "auto",
      }}
    >
      <StyledTabs
        onChange={(e, newVal) => changeCurrentFunction(newVal)}
        value={currentFunction}
        orientation="vertical"
        hidden={hidden}
      >
        <StyledTab
          value={"help"}
          label="Help"
          icon={<img alt="Help" src={isOpen ? helpIcon : blackHelpIcon} />}
        />
        <StyledTab
          value={"team"}
          label="Team"
          icon={<img alt="Team" src={isOpen ? teamIcon : blackTeamIcon} />}
        />
        <StyledTab
          value={"save"}
          label="Save"
          icon={<img alt="Save" src={isOpen ? saveIcon : blackSaveIcon} />}
        />
        <Tab value={null} style={{ display: "none" }} />
      </StyledTabs>
      <Collapse
        style={{ display: "flex" }}
        in={isOpen}
        orientation="horizontal"
      >
        <TheDrawer
          isReadOnly={isReadOnly}
          date={date}
          changeCurrentFunction={changeCurrentFunction}
          currentFunction={currentFunction}
        />
      </Collapse>
    </Paper>
  );
}

export default Functions;
