import React, { Component } from "react";
import ShiftFilter from "./shiftfilter/ShiftFilter";
import TimeLine from "./TimeLine";
import TimeSlots from "./timeslots/TimeSlots";
import "./visualizer.css";

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
    const { isDesktop, day } = this.props;
    const { shiftFilter } = this.state;
    return (
      <div className="visualizer">
        <ShiftFilter
          handleShiftFilter={this.handleShiftFilter}
          handleSwitch={this.handleSwitch}
          shiftFilter={shiftFilter}
          isDesktop={isDesktop}
        />
        <TimeLine shiftFilter={shiftFilter} isDesktop={isDesktop} />
        <TimeSlots shiftFilter={shiftFilter} workblocks={day.workblocks} />
      </div>
    );
  }
}

export default Visualizer;
