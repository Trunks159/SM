import React, { Component } from "react";
import { Paper } from "@mui/material";
import Functions from "./functions/Functions";
import MainContent from "./MainContent";
import TimeLine from "./visualizer/TimeLine";

class TabPanels extends Component {
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
    const { isDesktop, days } = this.props;

    return days.map((day) => {
      const isActive = currentDay === day;
      return (
        <Paper
          key={day.id}
          elevation={0}
          style={{
            position: "relative",
            display: isActive ? "flex" : "none",
            flexDirection: "column",
            flex: 1,
            background: "#F5F5F5",
          }}
        >
          <MainContent day={day} isDesktop={isDesktop} />
        </Paper>
      );
    });
  }
}

export default TabPanels;
