import React, { useState } from "react";
import saveIcon from "./assets/Save Icon.svg";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";
import Notification from "./Notification";
import styled from "@emotion/styled";

const SaveButton = styled(Button)({
  background: "#54F2D1",
  textTransform: "none",
  color: "white",
  width: 114,
  height: 36,
  borderRadius: 4,
  "&:hover": {
    opacity: 0.7,
  },
});

/*
So we need to collapse and once in is set to false
set the message to null

*/

const SavePrompt = ({ index, currentFunction }) => {
  const currentSchedule = useSelector((state) => state.currentSchedule);
  const { timeslots } = currentSchedule;
  const [alert, setAlert] = useState(null);

  const handleSave = () => {
    fetch("/update_schedule", {
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
      className="save-prompt"
      style={{ display: currentFunction === index ? "flex" : "none" }}
    >
      <Notification message={alert} />
      <h2>Completion Status</h2>
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
        onClick={handleSave}
        endIcon={<img alt="Save" src={saveIcon} />}
      >
        Save
      </SaveButton>
    </div>
  );
};

export default SavePrompt;
