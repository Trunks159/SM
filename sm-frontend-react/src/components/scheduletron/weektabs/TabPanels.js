import React, { Component } from "react";
import { Paper } from "@mui/material";
import Functions from "./functions/Functions";
import MainContent from "./MainContent";

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
          style={{
            position: "relative",
            display: isActive ? "flex" : "none",
            background: "#EAEAEA",
            flexDirection: "column",
          }}
        >
          <Functions
            isDesktop={isDesktop}
            currentFunction={currentFunction}
            setCurrentFunction={this.setCurrentFunction}
          />
          <MainContent
            isDesktop={isDesktop}
            day={day}
            currentFunction={currentFunction}
          />
        </Paper>
      );
    });
  }
}

export default TabPanels;
