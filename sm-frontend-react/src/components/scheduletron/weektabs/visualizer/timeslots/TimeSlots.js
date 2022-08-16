import React, { Component } from "react";
import { arrayOfDates, timeToFloat } from "../../../../TimeFunctions";
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

  render() {
    const { workblocks, shiftFilter } = this.props;
    const timelineRange = this.getTimelineRange(shiftFilter);
    return (
      <div className="timeslots">
        {workblocks.map((workblock) => {
          const availableTimes = timelineRange.map((av) => timeToFloat(av));
          console.log("ME: ", workblock.startTime.hours());
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
                dates={arrayOfDates()}
                availableTimes={availableTimes}
                startTime={workslot[0]}
                endTime={workslot[1]}
                shiftFilter={shiftFilter}
                user={workblock.user}
              />
            )
          );
        })}
      </div>
    );
  }
}

export default TimeSlots;
