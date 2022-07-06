import React, { Component } from "react";
import { Paper } from "@mui/material";
import Functions from "./functions/Functions";
import MainContent from "./MainContent";

class TabPanels extends Component {
  state = {
    currentFunction: 1,
  };
  setCurrentFunction = (e, newValue) =>
    newValue !== this.state.currentFunction &&
    this.setState({ currentFunction: newValue });

  render() {
    const {currentFunction} = this.state;
    const { days, isDesktop, currentDay} = this.props;
    return days.map((day) => (
      <Paper style={{ display: "flex" }}>
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
    ));
  }
}

export default TabPanels;
