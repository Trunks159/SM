import React, { useState } from "react";
import saveIcon from "./assets/Save Icon.svg";
import { Button } from "@mui/material";
import { Collapse, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import {Alert} from "@mui/material";
import Notification from "./Notification";

const useStyles = makeStyles({
  saveBtn: {
    "&:hover": {
      opacity: 0.7,
    },
  },
});
/*
So we need to collapse and once in is set to false
set the message to null

*/

const SavePrompt = ({ index, currentFunction }) => {
  const timeslots = useSelector((state) => state.timeslots);
  const classes = useStyles();
  const [alert, setAlert] = useState(null);

  const handleSave = () => {
    //convert the pixels to times, send objects to python
    const ts = timeslots.timeslots.map((timeslot) => {
      const { userId, dayId } = timeslot;
      return {
        user_id: userId,
        day_id: dayId,
        start_time: timeslot.getStartTime(),
        end_time: timeslot.getEndTime(),
      };
    });
    fetch("/update_schedule", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ts),
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
      <Notification message = {alert}/>
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
      <Button
        style={{
          background: "#54F2D1",
          textTransform: "none",
          color: "white",
          width: 114,
          height: 36,
          borderRadius: 4,
        }}
        className={classes.saveBtn}
        onClick={handleSave}
        endIcon={<img src={saveIcon} />}
      >
        Save
      </Button>
    </div>
  );
};

export default SavePrompt;
