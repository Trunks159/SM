import React, { Component } from "react";
import { timeToFloat } from "../../../../TimeFunctions";
import TimeSlot from "./TimeSlot";
import "./timeslots.css";

class TimeSlots extends Component {
  getTimelineRange = ({ day, night }) => {
    if (day && night) {
      return ["6:00", "23:59"];
    } else if (day === true) {
      return ["6:00", "15:00"];
    }
    return ["15:00", "23:59"];
  };

  timeslotPosition = (availableTimes = [6, 15], workslot = [2, 17]) => {
    /*Returns marginleft and width of the timeslot and lets
      react know whether theres overflow or not
    */

    const availableTimesDiff = availableTimes[1] - availableTimes[0];
    const marginLeft = workslot[0] - availableTimes[0];
    const marginRight = availableTimes[1] - workslot[1];
    const overflowLeft = marginLeft < 0 ? Math.abs(marginLeft) : 0;
    const overflowRight = marginRight < 0 ? Math.abs(marginRight) : 0;
    const trueWidth = workslot[1] - workslot[0];
    const width = trueWidth - overflowLeft - overflowRight;
    const toPercentage = (item) => (item / availableTimesDiff) * 100 + "%";
    console.log("Get stuff: ", width / availableTimesDiff);
    return {
      width: toPercentage(width),
      marginLeft: marginLeft < 0 ? "0%" : toPercentage(marginLeft),
      overflowLeft: overflowLeft !== 0,
      overflowRight: overflowRight !== 0,
      //if > 70% of the shift is within the current filter
      //display it
      hideSelf: width / trueWidth < 0.3,
    };
  };

  render() {
    const { workblocks, shiftFilter } = this.props;
    const timelineRange = this.getTimelineRange(shiftFilter);
    return (
      <div className="timeslots">
        {workblocks.map((workblock) => {
          const availableTimes = timelineRange.map((av) => timeToFloat(av));
          const workslot2 = [
            workblock.startTime * 0.16,
            workblock.endTime * 0.16,
          ];

          const workslot = [
            timeToFloat(workblock.startTime),
            timeToFloat(workblock.endTime),
          ];

          const isBetween = (value, range) =>
            value > range[0] && value < range[1];
          return (
            //if the user works outside of the time range dont render them
            (isBetween(workslot[0], availableTimes) ||
              isBetween(workslot[1], availableTimes)) && (
              <TimeSlot
                availableTimes={availableTimes}
                workslot={workslot}
                shiftFilter={shiftFilter}
                user={workblock.user}
                workblock={workblock}
              />
            )
          );
        })}
      </div>
    );
  }
}

export default TimeSlots;
