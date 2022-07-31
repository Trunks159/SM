import React, { Component } from "react";
import { Paper } from "@mui/material";
import Functions from "./functions/Functions";
import MainContent from "./MainContent";
import TimeLine from "./visualizer/TimeLine";

class TabPanels extends Component {
  state = {
    currentFunction: 1,
    currentDay: this.props.currentDay,
  };

  setCurrentFunction = (e, newValue) => {
    console.log("Newval: ", newValue);
    return (
      newValue !== this.state.currentFunction &&
      this.setState({ currentFunction: newValue })
    );
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.currentDay !== this.props.currentDay) {
      this.setState({ currentDay: this.props.currentDay });
    }
  };

  render() {
    const { currentFunction, currentDay } = this.state;
    const { isDesktop, days } = this.props;

    return days.map((day) => {
      const isActive = currentDay === day;
      return (
        <Paper
          key={day.id}
          elevation = {0}
          style={{
            position: "relative",
            display: isActive ? "flex" : "none",
            flexDirection: "column",
            flex : 1,
            background : 'none'
          }}
        >
        <TimeLine shiftFilter={{day : true, night : false}}/>
          <Paper>
            <p>Jordan Bless</p>
            <p>2AM - 1PM</p>
          </Paper>
        </Paper>
      );
    });
  }
}

export default TabPanels;
