import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Divider, Tabs, Tab } from "@mui/material";
import "./TeamPrompt.css";
import styled from "@emotion/styled";
import Dogtag from "./Dogtag";

const StyledTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    background: "#0FABFF",
  },
  width: "100%",
  margin: 0,
});

const StyledTab = styled(Tab)({
  minWidth: 0,
  width: "50%",
  textTransform: "none",
  fontSize: 13,
  fontWeight: 500,
  color: "white",
  opacity: ".8",
  "&.Mui-selected": {
    color: "white",
    opacity: 1,
  },
});

const StyledDivider = styled(Divider)({
  position: "absolute",
  right: 0,
  left: 0,
  bottom: 0,
  background: "rgba(255,255,255,.68)",
});

function TeamPrompt({ currentFunction, name, handleProfileChange }) {
  const currentSchedule = useSelector((state) => state.currentSchedule);
  const { timeslots, notScheduled } = currentSchedule;
  const workblocks = timeslots.map((ts) => currentSchedule.toWorkBlock(ts));
  const [currentTab, setCurrentTab] = useState("notScheduled");
  return (
    <div
      className="team-prompt"
      style={{ display: currentFunction === name ? "flex" : "none" }}
    >
      <div style={{ position: "relative" }}>
        <StyledDivider />
        <StyledTabs
          value={currentTab}
          onChange={(e, newTab) => setCurrentTab(newTab)}
        >
          <StyledTab label="Scheduled" value={"scheduled"} />
          <StyledTab label="The Bench" value={"notScheduled"} />
        </StyledTabs>
      </div>

      <ul
        className="scheduled"
        style={{ display: currentTab === "scheduled" ? "flex" : "none" }}
      >
        {workblocks.map(({ startTime, endTime, user }, index) => {
          return (
            <li key={index}>
              <Dogtag
                startTime={startTime}
                endTime={endTime}
                user={user}
                handleProfileChange={handleProfileChange}
              />
            </li>
          );
        })}
      </ul>

      <ul
        className="not-scheduled"
        style={{ display: currentTab === "notScheduled" ? "flex" : "none" }}
      >
        {notScheduled.map((user, index) => {
          return (
            <li key={index}>
              <Dogtag user={user} handleProfileChange={handleProfileChange} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TeamPrompt;
