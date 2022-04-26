import React, { Component } from "react";
import { Paper, withStyles } from "@material-ui/core";
import SchedulePaper from "./SchedulePaper";
import scheduleIcon from "../../assets/images/Schedule Icon White.svg";
import { Link } from "react-router-dom";

const styles = () => ({
  main: {
    flexGrow: 1,
    display: "flex",
    background: "white",
    flexDirection: "column",
    margin: "0px 60px",
    borderLeft: "2px solid #ECECEC",
    borderRight: "2px solid #ECECEC",
  },
  header: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#275C78",
  },
  mainFlex: {
    display: "grid",
    gridTemplateColumns : '1fr 1fr'
  },
  container1: {
    background : 'red',
    display :'flex',
    flexDirection : 'column',
    gap : '10px',
  },
  container2: {
    background: "green",
    justifySelf: "start",
  },
  container3: {
    justifySelf: "start",
    background: "yellow",
  },

  mainAction: {
    background: "#1897E6",
    padding: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 7,
    textDecoration: "none",
    color: "white",
    marginLeft : 'auto',
    width:  250,
    '& img':{
      width : 48,

    },
    '& p':{
      fontSize : 14,
      fontWeight :'bold',
    }
  },
  header2: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

class Dashboard extends Component {
  state = {
    schedule: null,
  };

  componentDidMount = () => {
    const today = { day: 13, month: 9, year: 2021 };
    fetch(`get_day/${today.month}-${today.day}-${today.year}`)
      .then((response) => response.json())
      .then((schedule) => {
        this.setState({ schedule: schedule });
      });
  };

  render() {
    /*When the site actually works, the date wont be passed in
    instead, we'll just get today date */
    const { classes, currentUser } = this.props;

    return this.state.schedule ? (
      <div className={classes.main}>
        <p className={classes.header}>Dashboard</p>
        <div className={classes.mainFlex}>
          <div style={}>
          <div className={classes.container1}>
            <p className={classes.header2}>Today's Schedule</p>
            <SchedulePaper header={true} schedule={this.state.schedule} />
            <Link
              to="/scheduletron"
              style={{ textDecoration: "none", }}
            >
              <Paper elevation={2} className={classes.mainAction}>
                <p>View and Edit Schedules</p>
                <img alt=""  src={scheduleIcon} />
              </Paper>
            </Link>
          </div>
          </div>
          
          <div className={classes.container2}>
            <p>My Upcoming Shifts</p>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {currentUser.upcomingShifts.map(
                ({ date, startTime, endTime }) => (
                  <Paper
                    style={{
                      width: 90,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 21,
                        textAlign: "center",
                        marginBottom: 0,
                        marginTop: 10,
                      }}
                    >{`${date.month}/${date.day}`}</p>
                    <p
                      style={{ fontSize: 9, textAlign: "center" }}
                    >{`${startTime} - ${endTime}`}</p>
                  </Paper>
                )
              )}
            </div>
          </div>
          <div className={classes.container3}>
            <p>My Upcoming Request Offs</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {currentUser.upcomingRequestOffs.map(({ date }) => (
                <Paper
                  elevation={2}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: 21,
                      textAlign: "center",
                      margin: 5,
                    }}
                  >
                    {date}
                  </p>
                </Paper>
              ))}
            </div>
          </div>
        </div>
        {/*
         */}
      </div>
    ) : null;
  }
}

export default withStyles(styles)(Dashboard);
