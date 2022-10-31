import React, { Component } from "react";
import scheduleIconWhite from "../../../assets/images/Schedule Icon White.svg";
import openIconInactive from "../../../assets/images/Open Icon Not Active.svg";
import addIcon from "../../../assets/images/Regular Add Icon.svg";
import { Link, withRouter } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, TextField } from "@material-ui/core";
import ScheduleLink from "./ScheduleLink";
import "./home.css";

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
              <ul className="home-list">
                {weeks.map(({ week, timeFrame, staffing, id }) => {
                  const startDate = `${week[0].month}/${week[0].day}`;
                  const endDate = `${week[6].month}/${week[6].day}`;
                  const completion = Math.round(
                    (staffing.actual / staffing.projected) * 100
                  );
                  return (
                    <li key={id} className="home-schedule">
                      <p className="timeframe">{timeFrame}</p>
                      <ScheduleLink
                        key={id}
                        startDate={startDate}
                        endDate={endDate}
                        completion={completion}
                        id={id}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
            <Button
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                textTransform: "none",
                color: "white",
                background: "#606060",
                padding: "10px 20px",
              }}
              startIcon={<img alt="" style={{ width: 20 }} src={addIcon} />}
            >
              Add A Schedule
            </Button>
          </div>
        </div>
      )
    );
  }
}

export default withRouter(Home);
