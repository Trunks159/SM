import { Paper } from "@material-ui/core";
import React, { Component } from "react";
import { Link, useLocation } from "react-router-dom";
import scheduleIcon from "../../../assets/images/Schedule Icon White.svg";
import dayIcon from "../../../assets/images/Day Icon.svg";
import nightIcon from "../../../assets/images/Night Icon.svg";
import { Button } from "@mui/material";
import NewTabs from "./NewTabs";
import MyTabs from './MyTabs';
import './scheduler.css'

const withLocation = (WhateverComponent) => {
  return (props) => <WhateverComponent location={useLocation()} {...props} />;
};

class Scheduler extends Component {
  state = {
    day: this.props.day,
    days: this.props.days,
  };

  componentDidMount = () => {
    console.log("Duh day: ", this.props.days);
    if (Boolean(this.props.day) === false) {
      fetch(`/get_week_schedule/${this.props.dayId}`)
        .then((response) => response.json())
        .then(({ day, weekSchedule, scheduleSet }) => {
          console.log("Lets see: ", weekSchedule);
          const { handleSelect, setScheduleSet } = this.props;
          this.setState({ day: day, days: weekSchedule.schedule });
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
    console.log("Now its: ", this.state.day);
    return this.state.day ? <MyTabs days={this.state.days} /> : <p>Loading</p>;
  }
}

export default withLocation(Scheduler);
