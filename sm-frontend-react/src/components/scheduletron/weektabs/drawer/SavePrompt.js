import React, { useState } from "react";
import saveIcon from "./assets/Save Icon.svg";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  saveBtn : {
    '&:hover':{
      opacity : .7
    },
  },
});

const SavePrompt = ({ index, currentFunction }) => {
  const timeslots = useSelector((state) => state.timeslots);
  const classes = useStyles();

  const handleSave = () => {
    //convert the pixels to times, send objects to python
    const ts = timeslots.timeslots.map((timeslot) => {
      const { userId, dayId } = timeslot;
      console.log('Dayid my boi: ', dayId)
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
      .then((answer) => {
        console.log("THE ANSWER: ", answer);
      });
  };

  return (
    <div
      className="save-prompt"
      style={{ display: currentFunction === index ? "flex" : "none" }}
    >
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
        className = {classes.saveBtn}
        onClick={handleSave}
        endIcon={<img src={saveIcon} />}
      >
        Save
      </Button>
    </div>
  );
};

export default SavePrompt;
