import React, { Component } from "react";
import { arrayOfDates, timeToFloat } from "../../../../TimeFunctions";
import TimeSlot from "./TimeSlot";
import "./timeslots.css";

/*We're trying to take a date and get that date but
at 12AM

So same date, different time*/

class TimeSlots extends Component {
  getTimelineRange = ({ day, night }) => {
    const { theDate } = this.props;
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
    return (
      <div className="timeslots">
        {workblocks.map((workblock) => {
          
          console.log('TheWorkblock: ', timelineRange[0].toString())
          return (
            //if the user works outside of the time range dont render them
            (workblock.startTime.isBetween(
              timelineRange[0],
              timelineRange[1]
            ) ||
              workblock.endTime.isBetween(
                timelineRange[0],
                timelineRange[1]
              )) && (
              <TimeSlot
                dates={arrayOfDates()}
                availableTimes={timelineRange}
                startTime={workblock.startTime}
                endTime={workblock.endTime}
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
