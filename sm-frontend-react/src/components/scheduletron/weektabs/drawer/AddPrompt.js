import { Button, Paper } from "@mui/material";
import React, { Component } from "react";
import detailsIcon from "./assets/Details Icon.svg";
import addIcon from "./assets/Add Icon.svg";
import { withStyles } from "@material-ui/core";
import moment from "moment";

const styles = () => ({
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

class AddPrompt extends Component {
  state = {};

  addToSchedule = (scheduled, notScheduled, day, index) => {
    const user = notScheduled.splice( index,1 )[0];

    scheduled.push({
      user: user,
      startTime: moment(day.date).set("hour", 8),
      endTime: moment(day.date).set("hour", 16),
      userId: user.id,
      dayId: day.id,
    });
    dispatch(updateScheduled())
    return {scheduled : scheduled, notScheduled : notScheduled};
  };

  render() {
    const { teamMembers, currentFunction, index, classes , addToSchedule} = this.props;
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
              <Button style={{ minWidth: 0 }} onClick = {()=>addToSchedule(tm.id)}>
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
  }
}

export default withStyles(styles)(AddPrompt);
