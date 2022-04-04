import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import phonySchedule from "../assets/images/Phony Schedule.svg";
import phonyShift from "../assets/images/Phony Shift.svg";
const styles = () => ({
  main: {
    width: "100%",
    display : 'flex',
  },
});

class Dashboard extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <div>
          <p style = {{fontWeight : 'bold', fontSize :30, color : '#275C78' }}>Dashboard</p>
          <p>Today's Schedule</p>
          <img src={phonySchedule} />
        </div>
        <div >
            <p>My Upcoming Shifts</p>
            <img src = {phonyShift}/>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
