import React, { Component } from "react";
import ShiftFilter from "./shiftfilter/ShiftFilter";
import TimeLine from "./TimeLine";
import TimeSlots from "./timeslots/TimeSlots";
import "./visualizer.css";

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
        style={{ display: hidden ? "none" : "flex", flexDirection: "column" }}
        hidden={hidden}
      >
        <ShiftFilter
          handleShiftFilter={this.handleShiftFilter}
          handleSwitch={this.handleSwitch}
          shiftFilter={shiftFilter}
          isDesktop={isDesktop}
        />
        <div style = {{margin : '0px 20px'}}>
          <TimeLine shiftFilter={shiftFilter} isDesktop={isDesktop} />
          <TimeSlots shiftFilter={shiftFilter} workblocks={workblocks} />
        </div>
      </div>
    );
  }
}

export default Visualizer;
