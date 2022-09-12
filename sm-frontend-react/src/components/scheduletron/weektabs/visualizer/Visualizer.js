import React, { Component } from "react";
import ShiftFilter from "./shiftfilter/ShiftFilter";
import TimeLine from "./TimeLine";
import TimeSlots from "./timeslots/TimeSlots";
import "./visualizer.css";
import moment from "moment";

//Timeslot overflow feature isn't working properly rn
//maybe use a gradient?

class Visualizer extends Component {
  state = {
    shiftFilter: { day: true, night: true },
  };

  handleShiftFilter = (newValue) => this.setState({ shiftFilter: newValue });
  handleSwitch = (newValue, name) =>
    this.setState({
      shiftFilter: { ...this.state.shiftFilter, [name]: newValue },
    });

  render() {
    const { isDesktop, day, hidden, workblocks } = this.props;
    const { shiftFilter } = this.state;
    return (
      <div
        className="visualizer"
        style={{
          display: hidden ? "none" : "flex",
          flexDirection: "column",
        }}
        hidden={hidden}
      >
        <ShiftFilter
          handleShiftFilter={this.handleShiftFilter}
          handleSwitch={this.handleSwitch}
          shiftFilter={shiftFilter}
          isDesktop={isDesktop}
        />
        <div
          style={{
            margin: "0px 80px 27px 80px",
            position: "relative",
            flex: 1,
          }}
        >
          <TimeLine shiftFilter={shiftFilter} isDesktop={isDesktop} />
          <TimeSlots
            shiftFilter={shiftFilter}
            workblocks={workblocks}
            theDate={day.date}
            isMobile={!isDesktop}
          />
        </div>
      </div>
    );
  }
}

export default Visualizer;
