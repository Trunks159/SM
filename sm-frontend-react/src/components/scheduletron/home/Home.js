import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, TextField } from "@material-ui/core";
import "./home.css";
import styled from "@emotion/styled";
import ScheduleList from "./schedulelist/ScheduleList";
import ScheduleLink from "./schedulelist/ScheduleLink";

const AddBtn = styled(Button)(() => ({
  background: "#3E86AE",
  width: 60,
  height: 60,
  borderRadius: 30,
  minWidth: 0,
  minHeight: 0,
  color: "white",
  fontSize: 50,
  fontWeight: 400,
  position: "fixed",
  bottom: 0,
  right: 0,
  margin: 17,
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    background: "red",
  },
  "& .MuiButton-label": {
    margin: "0px 0px 3px 3px",
  },
}));
class Home extends Component {
  state = {
    weeks: null,
  };

  componentDidMount = () => {
    /*This would request for today but not yet
      it initializes the schedule set which is an array of
      5 or so weekSchedules
    */
    fetch(`/get_week_schedules/${9}-${13}-${2021}`)
      .then((response) => response.json())
      .then((scheduleSet) => {
        this.setWeeks(scheduleSet);
      });
  };

  setWeeks = (scheduleSet) => {
    /* Used by DayBtn and of course ComponentDidMount
        kinda self explanatory*/
    const weeks = scheduleSet.map(({ schedule, timeFrame }) => ({
      id: schedule.id,
      week: schedule.week,
      timeFrame: timeFrame,
      staffing: schedule.staffing,
    }));
    this.setState({ weeks: weeks });
  };

  render() {
    const { match, selectedWeek, setSelectedWeek, screenWidth } = this.props;
    const { weeks } = this.state;
    let isDesktop = screenWidth > 860;
    let isLargeDesktop = screenWidth > 1160;
    return (
      weeks && (
        <div className={"scheduletron-home"}>
          <div className={"home-container1"}>
            <h1>
              Let's get started! <br />
              Select a schedule below to <b>view</b> or <b>edit</b>
            </h1>
            {isDesktop && (
              <div
                style={isLargeDesktop ? { display: "none" } : null}
                className={"home-search"}
              >
                <p>Looking for a schedule in particular?</p>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Enter Date"
                    value={"02/22/1998"}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
            )}
          </div>
          {isLargeDesktop && (
            <div className="home-search2">
              <p>Looking for a schedule in particular?</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Enter Date"
                  value={"02/22/1998"}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <ScheduleLink
                varient={"unknown"}
                startDate={"?"}
                endDate={"?"}
                setSelectedWeek={setSelectedWeek}
              />
            </div>
          )}
          <div className="home-container2">
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                overflowX: "auto",
              }}
            >
              <ScheduleList weeks={weeks} />
            </div>
            <AddBtn>+</AddBtn>
          </div>
        </div>
      )
    );
  }
}

export default withRouter(Home);
