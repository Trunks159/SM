import React, { Component } from "react";
import ProfileTag from "./ProfileTag.js";
import { withStyles } from "@material-ui/styles";
import { Checkbox, Divider, Box } from "@material-ui/core";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import BasicSpeedDial from "./BasicSpeedDial.js";

const styles = () => ({
  main: {
    background: "#D8F4EE",
    borderRadius: 7,
    margin: 10,
    maxHeight: "100%",
  },
  checkbox: {
    color: "#FFB932",
    "&.Mui-checked": {
      color: "#FFB932",
    },
  },
  textDiv: {
      position :'relative',
    margin: 10,
    "& p": {
      whiteSpace: "nowrap",
      display: "inline-block",
    },
  },
  list: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    margin: 10,
    gap: "10px",
  },
  speedDial: {
    "&.MuiSpeedDialAction": {
      backgroundColor: "red",
    },
    "& button": {
      background: "orange",
    },
  },
});

class WorkerList extends Component {
  render() {
    const { classes } = this.props;
    const workers = [
      { firstName: "Bob", position: "manager", startTime: 0, endTime: 50 },
      { firstName: "Jordan", position: "crew", startTime: 0, endTime: 50 },
    ];

    return (
      <div className={classes.main}>
        <div className={classes.textDiv}>
          <p>Sort By:</p>
          <p style={{ marginLeft: 10 }}>A-Z</p>
          <Checkbox className={classes.checkbox} />
          <p>Time</p>
          <Checkbox className={classes.checkbox} />
          <BasicSpeedDial/>
          
          <Divider />
        </div>
        <div className={classes.list}>
          {workers.map(({ firstName, position, startTime, endTime }) => {
            return (
              <ProfileTag
                firstName={firstName}
                position={position}
                startTime={startTime}
                endTime={endTime}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(WorkerList);
