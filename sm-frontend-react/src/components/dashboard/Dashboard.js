import React, { Component } from "react";
import { Paper, withStyles } from "@material-ui/core";
import TodaysSchedule from "./TodaysSchedule";

const styles = () => ({
  main: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    background: "white",
  },
});

class Dashboard extends Component {
  state = {};
  render() {
    /*When the site actually works, the date wont be passed in
    instead, we'll just get today date */
    const { classes, currentUser } = this.props;
    console.log("CUrrent: ", currentUser);

    return (
      <div className={classes.main}>
        <div style = {{margin : 20}}>
          <p style={{ fontWeight: "bold", fontSize: 30, color: "#275C78" }}>
            Dashboard
          </p>
          <p style={{ fontSize: "18", fontWeight: "bold" }}>Today's Schedule</p>
          <TodaysSchedule currentUser={currentUser} />
        </div>
        <div>
          <p>My Upcoming Shifts</p>
          <div style = {{display : 'flex', flexWrap :'wrap'}}>
          {currentUser.upcomingShifts.map(({ date, startTime, endTime }) => (
            <Paper style = {{width :90, display :'flex', flexDirection : 'column', alignItems :'center',}} >
              <p style = {{fontSize : 21, textAlign : 'center',marginBottom :0, marginTop : 10}}>{`${date.month}/${date.day}`}</p>
              <p style = {{fontSize : 9, textAlign : 'center'}}>{`${startTime} - ${endTime}`}</p>
            </Paper>
          ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
