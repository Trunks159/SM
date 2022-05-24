import React, { Component } from "react";
import { Paper, withStyles } from "@material-ui/core";
import SchedulePaper from "../schedulePaper/SchedulePaper";
import scheduleIcon from "../../assets/images/Schedule Icon White.svg";
import { Link } from "react-router-dom";
import "./dashboard.css";

const styles = () => ({
  mainFlex: {
    display: "grid",
    gridTemplateColumns: "3fr 1fr",
    columnGap: "10px",
    rowGap: "10px",
    "@media (max-width : 700px)": {
      gridTemplateColumns: "1fr",
    },
  },
  container2: {
    display: "flex",
    flexWrap: "wrap",
    alignSelf: "start",
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
    marginLeft: "auto",
    width: 250,
    "& img": {
      width: 48,
    },
    "& p": {
      fontSize: 14,
      fontWeight: "bold",
    },
  },
});

class Dashboard extends Component {
  state = {
    schedule: null,
  };

  componentDidMount = () => {
    /*When the site actually works, the date wont be passed in
    instead, we'll just get today date */
    const today = { day: 13, month: 9, year: 2021 };
    fetch(`get_day/${today.month}-${today.day}-${today.year}`)
      .then((response) => response.json())
      .then((schedule) => {
        this.setState({ schedule: schedule });
      });
  };

  render() {
    const { classes, currentUser } = this.props;

    return this.state.schedule ? (
      <div className="dashboard">
        <header>
          <h1>Dashboard</h1>
        </header>
        <div className="mainFlex">
          <SchedulePaper schedule={this.state.schedule} />
          {/*
          <div className='dashboard-schedule'>
            <h2 >Today's Schedule</h2>
            <div style={{ display: "flex", height: 342, maxWidth: 840 }}>
              <SchedulePaper header={true} schedule={this.state.schedule} />
            </div>

            <Link to="/scheduletron" style={{ textDecoration: "none" }}>
              <Paper elevation={2} className={classes.mainAction}>
                <p>View and Edit Schedules</p>
                <img alt="" src={scheduleIcon} />
              </Paper>
            </Link>
          </div>
          <div className={classes.container2}>
            <div>
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
            <div>
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
          </div>*/}
        </div>
      </div>
    ) : null;
  }
}

export default withStyles(styles)(Dashboard);
