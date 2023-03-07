import React, { useState } from "react";
import saveIcon from "./assets/Save Icon.svg";
import { Button, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";
import Notification from "../Notification";
import styled from "@emotion/styled";
import "./SavePrompt.css";

const SaveButton = styled(Button)({
  background: "#007363",
  color: "white",
  borderRadius: 4,
  "&:hover": {
    background: "#11B79F",
  },
  fontWeight: "bold",
  fontSize: 20,

  width: 150,
  justifyContent: "center",
  marginTop: 20,
});

const SavePrompt = ({ name, currentFunction, isReadOnly, readOnlyWarning }) => {
  const currentSchedule = useSelector((state) => state.currentSchedule);
  const { timeslots } = currentSchedule;
  const [alert, setAlert] = useState(null);

  const handleSave = () => {
    fetch("/api/update_schedule", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workblocks: timeslots.map((ts) => {
          const wb = currentSchedule.toWorkBlock(ts);
          return {
            ...wb,
            start_time: wb.startTime,
            end_time: wb.endTime,
          };
        }),
        day_id: currentSchedule.dayId,
      }),
    })
      .then((response) => response.json())
      .then(({ severity, message }) => {
        notifyUser(<Alert severity={severity}>{message}</Alert>);
      });
  };

  function notifyUser(alert) {
    setAlert(alert);
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  }

  return (
    <div
      className={`save-prompt prompt${
        currentFunction === name ? "" : "-hidden"
      }`}
    >
      <h1>Save Your Progress</h1>
      <Notification message={alert} />
      <h4>Completion Status</h4>
      <ul>
        <li>
          <h3>Staffing</h3>
          <caption>6/10</caption>
          <p>Shift has been staffed to minimum requirements</p>
        </li>

        <li>
          <h3>Availability Violations</h3>
          <caption>2</caption>
          <p>Only 2 availability violations found</p>
        </li>
      </ul>
      <SaveButton
        onClick={() => (isReadOnly ? readOnlyWarning() : handleSave())}
        endIcon={<img alt="Save" src={saveIcon} />}
      >
        Save
      </SaveButton>
    </div>
  );
};

export default SavePrompt;
