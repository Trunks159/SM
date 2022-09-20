import { Button, Paper } from "@mui/material";
import React, { Component } from "react";
import detailsIcon from "./assets/Details Icon.svg";
import addIcon from "./assets/Add Icon.svg";
import { withStyles } from "@material-ui/core";

const styles = () => ({
  paper: {
    color: "black",
    textTransform: "capitalize",
    background: "#F1F1F1",
    width: 135,
    height: 100,
    fontWeight: "normal",
    position: "relative",
    border: "1px solid #F1F1F1",
    padding : 10,
    borderRadius : 7,
    "& p": {
      margin: 10,
      fontSize: 19,

    },
    "& i": {
      fontWeight: 200,
      margin: 10,
      fontSize: 13,
    },
    "& .details": {
      position: "absolute",
      top: 0,
      right: 0,
      minWidth: 0,
      padding: 12,
    },
    

    display: "flex",
    flexDirection: "column",
  },
});

class AddPrompt extends Component {
  state = {};
  render() {
    const { teamMembers, currentFunction, index, classes } = this.props;
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
              <Button>
                <img src={addIcon} />
              </Button>
              <Paper className={classes.paper}>
                <p>
                  {tm.firstName} {tm.lastName}{" "}
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
