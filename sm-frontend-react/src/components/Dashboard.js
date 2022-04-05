import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import blueLine from "../assets/images/Blue Line.svg";
import timeLine from "../assets/images/TimeLine.svg";
import phonyShift from "../assets/images/Phony Shift.svg";
const styles = () => ({
  main: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
  },
  paper: {
    maxWidth: 837,
    height: 342,
  },
});

class Dashboard extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <div>
          <p style={{ fontWeight: "bold", fontSize: 30, color: "#275C78" }}>
            Dashboard
          </p>
          <p>Today's Schedule</p>
          <Paper className={classes.paper}>
            <p> Monday, 9/17</p>
            <div style = {{display :'grid', gridTemplateColumns : '1fr 1fr', alignItems :'center'}}>
              {'Team'}
              <img src = {timeLine}/>
              <p>Jordan Bless</p>
              <img src = {blueLine} style = {{margin : 15, paddingLeft : '27%', paddingRight :'10%', }}/>
            </div>
            

          </Paper>
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
