import React, { Component } from "react";
import { arrayOfDates, timeToFloat } from "../../../../TimeFunctions";
import TimeSlot from "./TimeSlot";
import "./timeslots.css";

/*We're trying to take a date and get that date but
at 12AM

So same date, different time*/

class TimeSlots extends Component {
  getTimelineRange = ({ day, night }) => {
    const {theDate} = this.props;
    const set = [
      theDate.clone().set({ h: 8, m: 0 }),
      theDate.clone().set({ h: 16, m: 0 }),
      theDate.clone().set({ h: 0, m: 0 }).add(1, "days"),
    ];
    if (day && night) {
      return [set[0], set[2]];
    } else if (day === true) {
      return [set[0], set[1]];
    }
    return [set[1], set[2]];
  };

  render() {
    const { workblocks, shiftFilter, theDate } = this.props;
    const timelineRange = this.getTimelineRange(shiftFilter);
    console.log('Timelinerange: ', timelineRange)
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
