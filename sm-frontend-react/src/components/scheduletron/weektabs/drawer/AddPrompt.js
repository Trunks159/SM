import { Button } from "@mui/material";
import React, { Component } from "react";
import detailsIcon from "./assets/Details Icon.svg";
import { withStyles } from "@material-ui/core";

const styles = () => ({
  btn: {
    color: "black",
    textTransform: "capitalize",
    background: "#F1F1F1",
    width: 150,
    height: 50,
    fontWeight: "normal",
    position: "relative",
    "& p": {
      margin: 0,
      fontSize: 14,
    },
    "& i": {
      fontWeight: 200,
      margin: -3,
      fontSize: 11,
    },
    "& .details": {
      position: "absolute",
      top: 0,
      right: 0,
      minWidth: 0,
    },
    border: "1px solid #F1F1F1",
    "&:hover": {
      background: "white",
      border: "1px solid #00BCFF",
    },
    display: "flex",
    flexDirection: "column",
  },
});

class AddPrompt extends Component {
  state = {};
  render() {
    const { teamMembers, currentTab, index, classes } = this.props;
    return (
      <div
        style={{
          display: currentTab === index ? "flex" : "none",
          flexDirection: "column",
        }}
      >
        <p style={{ fontSize: 12, color: "rgb(200, 200, 200)" }}>
          Select team members you'd like to add to the schedule
        </p>

        <ul>
          {teamMembers.map((tm, i) => (
            <li key={i}>
              <Button className={classes.btn}>
                <p>
                  {tm.firstName} {tm.lastName}{" "}
                </p>
                <i> {tm.position}</i>
                <Button className="details">
                  <img src={detailsIcon} />
                </Button>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withStyles(styles)(AddPrompt);
