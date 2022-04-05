import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import phonyShift from "../../assets/images/Phony Shift.svg";
import TodaysSchedule from "./TodaysSchedule";
const styles = () => ({
  main: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
  },
  
});

class Dashboard extends Component {
  state = {};
  render() {
    const { classes, teamMembers } = this.props;
    return (
      <div className={classes.main}>
        <div>
          <p style={{ fontWeight: "bold", fontSize: 30, color: "#275C78" }}>
            Dashboard
          </p>
          <p style = {{fontSize :'18', fontWeight : 'bold'}}>Today's Schedule</p>
          <TodaysSchedule teamMembers={teamMembers}/>
        </div>
        <div>
          <p>My Upcoming Shifts</p>
          <img src={phonyShift} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
