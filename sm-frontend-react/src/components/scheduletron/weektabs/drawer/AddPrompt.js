import { Button, Paper } from "@mui/material";
import React from "react";
import detailsIcon from "./assets/Details Icon.svg";
import addIcon from "./assets/Add Icon.svg";
import { makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

const addToScheduled = (info) => {
  return {
    type: "ADD_TO_SCHEDULED",
    payLoad: info,
  };
};

const updateNotScheduled = (newNotScheduled) => {
  return {
    type: "UPDATE_NOT_SCHEDULED",
    payLoad: newNotScheduled,
  };
};

const useStyles = makeStyles({
  paper: {
    color: "black",
    textTransform: "capitalize",
    background: "#F1F1F1",
    width: 155,
    height: 100,
    fontWeight: "normal",
    position: "relative",
    border: "1px solid #F1F1F1",
    padding: 10,
    borderRadius: 7,
    "& p": {
      margin: 10,
      fontSize: 22,
      textAlign: "center",
    },
    "& i": {
      fontWeight: 200,
      margin: 5,
      fontSize: 15,
      textAlign: "center",
    },
    "& .details": {
      position: "absolute",
      top: 0,
      right: 0,
      minWidth: 0,
      padding: 15,
    },

    display: "flex",
    flexDirection: "column",
  },
});

const AddPrompt = ({ currentFunction, index, date }) => {
  const teamMembers = useSelector((state) => state.notScheduled);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleAdd = (notScheduled, date, userIndex) => {
    const user = notScheduled.splice(userIndex, 1)[0];
    dispatch(addToScheduled({ user: user, date: date }));
    dispatch(updateNotScheduled(notScheduled));
  };

  return (
    <div
      className="add-prompt"
      style={{
        display: currentFunction === index ? "flex" : "none",
        flexDirection: "column",
      }}
    >
      <p style={{ fontSize: 12, color: "rgb(200, 200, 200)" }}>
        Select team members you'd like to add to the schedule
      </p>

      <ul className="add-member-list">
        {teamMembers.map((tm, i) => (
          <li key={i}>
            <Button
              style={{ minWidth: 0 }}
              onClick={() => handleAdd(teamMembers, date, i)}
            >
              <img src={addIcon} />
            </Button>
            <Paper className={classes.paper}>
              <p>
                {tm.firstName}
                <br />
                {tm.lastName}
              </p>
              <i> {tm.position}</i>
              <Button className="details">
                <img src={detailsIcon} />
              </Button>
            </Paper>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddPrompt;
