import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Tabs, Tab } from "@mui/material";
import styled from "@emotion/styled";
import Dogtag from "./Dogtag";
import ProfileInfo from "./ProfileInfo";
import Notification from "../../Notification";

function addToSchedule({ date, index }) {
  return {
    type: "ADD_TO_SCHEDULED",
    payLoad: { date, index },
  };
}

const StyledTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    background: "#0FABFF",
  },
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
  margin: 0,
  right: 0,
  left: 0,
  bottom: 0,
  background: "rgba(255,255,255,.68)",
});

function TeamPrompt({
  handleProfileChange,
  profile,
  isReadOnly,
  readOnlyWarning,
}) {
  const dispatch = useDispatch();

  const currentSchedule = useSelector((state) => state.currentSchedule);
  const selectedWeek = useSelector((state) => state.selectedWeek);

  const [currentTab, setCurrentTab] = useState("notScheduled");

  const { timeslots, notScheduled, dayId } = currentSchedule;
  const workblocks = timeslots.map((ts) => currentSchedule.toWorkBlock(ts));

  const date = selectedWeek.week.find(
    ({ id }) => id === currentSchedule.dayId
  ).date;

  function handleAddToSchedule(index) {
    dispatch(addToSchedule({ date, index }));
  }

  return (
    <div className="team-prompt">
      {profile ? (
        <ProfileInfo profile={profile} />
      ) : (
        <>
          <div style={{ position: "relative" }}>
            <StyledTabs
              value={currentTab}
              onChange={(e, newTab) => setCurrentTab(newTab)}
            >
              <StyledTab label="Scheduled" value={"scheduled"} />
              <StyledTab label="The Bench" value={"notScheduled"} />
              <StyledDivider />
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
                    index={index}
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
                  <Dogtag
                    index={index}
                    isReadOnly={isReadOnly}
                    readOnlyWarning={readOnlyWarning}
                    user={user}
                    handleProfileChange={handleProfileChange}
                    handleAddToSchedule={handleAddToSchedule}
                  />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default TeamPrompt;
