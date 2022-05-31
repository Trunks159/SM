import { Paper } from "@material-ui/core";
import React, { Component } from "react";
import { Link, useLocation } from "react-router-dom";
import scheduleIcon from "../../../assets/images/Schedule Icon White.svg";
import dayIcon from "../../../assets/images/Day Icon.svg";
import nightIcon from "../../../assets/images/Night Icon.svg";
import { Button } from "@mui/material";
import Main from "./Main";
import './scheduler.css'

const withLocation = (WhateverComponent) => {
  return (props) => <WhateverComponent location={useLocation()} {...props} />;
};

class Scheduler extends Component {
  state = {
    day: this.props.day,
  };

  componentDidMount = () => {
    console.log('Duh day: ', this.props.day)
    if (Boolean(this.props.day) === false) {
      fetch(`/get_week_schedule/${this.props.dayId}`)
        .then((response) => response.json())
        .then(({ day, weekSchedule, scheduleSet }) => {
          console.log("Lets see: ", day);
          const { handleSelect, setScheduleSet } = this.props;
          this.setState({ day: day });
          handleSelect({ week: weekSchedule.schedule, id: weekSchedule.id });
          setScheduleSet(scheduleSet);
        });
    }
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.day !== this.props.day) {
      this.setState({ day: this.props.day });
    }
  };

  render() {
    const { marginLeft } = this.props;
    console.log('Now its: ', this.state.day);
    return this.state.day ? (
      <div
        className="scheduler-main"
      >


        {/*
        <Paper
          elevation={2}
          style={{
            flexGrow: 1,
            margin: 10,
            background: "white",
            borderRadius: 7,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              background: "#143D53",
              display: "flex",
              padding: 5,
              color: "white",
              borderRadius: "7px 7px 0px 0px",
            }}
          >
            <img alt="" style={{ width: 38 }} src={scheduleIcon} />
            <p>{this.state.day.weekday}, </p>
            <p>
              {this.state.day.month}/{this.state.day.day}
            </p>
            <Button
              style={{
                minWidth: 1,
                minHeight: 1,
                padding: 0,
                marginLeft: "auto",
              }}
            >
              <img alt="" style={{ margin: 0, width: 32 }} src={dayIcon} />
            </Button>
            <Button
              style={{
                minWidth: 1,
                minHeight: 1,
                padding: 0,
              }}
            >
              <img alt="" style={{ width: 20, margin: 0 }} src={nightIcon} />
            </Button>
          </div>

          <Main schedule={this.state.day} />
        </Paper>
        <div style={{ margin: 20, display: "flex" }}>
          <Link to="/">Back To Yesterday</Link>
          <Link to="/" style={{ marginLeft: "auto" }}>
            To Tommorrow
          </Link>
        </div>*/}
      </div>
    ) : (
      <p>Loading</p>
    );
  }
}

export default withLocation(Scheduler);
