import React, { Component } from "react";
import { Paper } from "@mui/material";
import Functions from "./functions/Functions";
import MainContent from "./MainContent";
import AddDrawer from "./editor/AddDrawer";

class TabPanels extends Component {
  state = {
    currentFunction: 1,
  };
  setCurrentFunction = (e, newValue) =>
    newValue !== this.state.currentFunction &&
    this.setState({ currentFunction: newValue });

  render() {
    const { currentFunction } = this.state;
    const { days, isDesktop, currentDay } = this.props;
    return (
      <Paper style={{ display: "flex" }}>
        <MainContent
          isDesktop={isDesktop}
          day={currentDay}
          currentFunction={currentFunction}
        />
        <Functions
          isDesktop={isDesktop}
          currentFunction={currentFunction}
          setCurrentFunction={this.setCurrentFunction}
        />
      </Paper>
    );
  }
}

export default TabPanels;
