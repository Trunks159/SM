import React, { Component } from "react";
import scheduleIcon from "../../assets/images/Schedule Icon Black.svg";
import scheduleIconWhite from "../../assets/images/Schedule Icon White.svg";
import openIcon from "../../assets/images/Open Icon.svg";
import openIconInactive from "../../assets/images/Open Icon Not Active.svg";
import addIcon from "../../assets/images/Add Icon.svg";
import { Link } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, TextField, Paper, withStyles } from "@material-ui/core";

const styles = () => ({
  label: {
    flexDirection: "column",
    fontSize: 25,
  },
  button: {
    padding: 30,
    display: "flex",
  },
});

class Home extends Component {
  state = {
    schedules: [],
  };

  componentDidMount = () => {
    /*This would request for today but not yet */
    fetch(`/get_week_schedules/${9}-${13}-${2021}`)
      .then((response) => response.json())
      .then((schedules) => {
        schedules = schedules.map(({ schedule, timeFrame }) => ({
          week: schedule.schedule,
          timeFrame: timeFrame,
          staffing: schedule.staffing,
        }));
        console.log("The schedules: ", schedules);
        this.setState({ schedules: schedules });
      });
  };
  render() {
    const { classes } = this.props;
    return (
      <div style={{ background: "#F0F0F0", height: "100%" }}>
        <p style={{ fontSize: 31 }}>
          To start, select schedule to <b>view</b> or <b>edit</b>
        </p>
        <div
          style={{
            display: "inline-flex",
            gap: 10,
            background: "white",
            padding: 20,
            alignItems: "center",
            borderRadius: 7,
          }}
        >
          {this.state.schedules.map(({ week, timeFrame, staffing }) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  textTransform: "capitalize",
                  fontSize: 15,
                  margin: 0,
                }}
              >
                {timeFrame}
              </p>
              <Paper
                style={{
                  width: 145,
                  height: 205,
                  background: "#DADADA",
                  position: "relative",
                  borderRadius: "7px",
                }}
              >
                <Paper
                  style={{
                    width: "70%",
                    height: "100%",
                    background: "#F0F0F0",
                    position: "absolute",
                    borderRadius: "7px 0px 0px 7px",
                  }}
                ></Paper>

                <Button
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                  }}
                  classes={{ label: classes.label, root: classes.button }}
                >
                  {week[0].month}/{week[0].day}
                  <img style={{ margin: "10px 0px" }} src={scheduleIcon} />
                  {week[6].month}/{week[6].day}
                  <p style={{ fontSize: 9, textTransform: "none", margin: 0 }}>
                    {Math.round((staffing.actual / staffing.projected) * 100)}%
                    Complete
                  </p>
                </Button>
              </Paper>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", padding: 25, gap: 15 }}>
          <Button
            style={{
              marginLeft: "auto",
              textTransform: "none",
              color: "white",
              background: "#606060",
              padding: "10px 20px",
            }}
            startIcon={<img style={{ width: 20 }} src={addIcon} />}
          >
            Add A Schedule
          </Button>
          <Link
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "#CBCBCB",
            }}
            to="/"
          >
            <img src={openIconInactive} />
            Open
          </Link>
        </div>

        <div>
          <p>Looking for a schedule in particular?</p>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Enter Date"
              value={"02/22/1998"}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button
            style={{
              background: "#DDDDDD",
              color: "white",
              borderRadius: "7px",
            }}
            classes={{ label: classes.label, root: classes.button }}
          >
            ?
            <img style={{ width: 72 }} src={scheduleIconWhite} />?
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
