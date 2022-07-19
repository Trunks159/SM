import React, { Component } from "react";
import ShiftFilter from "./shiftfilter/ShiftFilter";
import TimeLine from "./TimeLine";
import TimeSlots from "./timeslots/TimeSlots";
import "./visualizer.css";

class Visualizer extends Component {
  state = {};

  render() {
    const { day, workblocks } = this.props;
    return (
      <div className="visualizer" hidden={hidden}>
        {/*<ShiftFilter
          handleShiftFilter={this.handleShiftFilter}
          handleSwitch={this.handleSwitch}
          shiftFilter={shiftFilter}
          isDesktop={isDesktop}
    />*/}
        <TimeLine />
        <TimeSlots workblocks={workblocks} />
      </div>
    );
  }
}

export default Visualizer;
