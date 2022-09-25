import React, { Component } from "react";
import { Paper } from "@mui/material";
import Functions from "./functions/Functions";
import MainContent from "./MainContent";
import TimeLine from "./visualizer/TimeLine";

class TabPanel extends Component {
  state = {
    currentDay: this.props.currentDay,
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.currentDay !== this.props.currentDay) {
      this.setState({ currentDay: this.props.currentDay });
    }
  };

  render() {
    const { currentDay } = this.state;
    const { isDesktop } = this.props;

    return (
      <Paper
        key={currentDay.id}
        elevation={0}
        style={{
          position: "relative",
          flexDirection: "column",
          flex: 1,
          background: "#F5F5F5",
        }}
      >
        <MainContent day={currentDay} isDesktop={isDesktop} />
      </Paper>
    );
  }
}

export default TabPanel;
