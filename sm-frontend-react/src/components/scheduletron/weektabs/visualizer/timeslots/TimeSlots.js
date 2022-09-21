import moment from "moment";
import React, { Component } from "react";
import { arrayOfDates, timeToFloat } from "../../../../TimeFunctions";
import TimeSlot from "./TimeSlot";
import "./timeslots.css";

/*We're trying to take a date and get that date but
at 12AM

So same date, different time*/

class TimeSlots extends Component {
  getTimelineRange = ({ day, night }) => {
    let theDate = moment(this.props.theDate);
    const set = [
      theDate.clone().set({ h: 6, m: 0 }),
      theDate.clone().set({ h: 15, m: 0 }),
      theDate.clone().set({ h: 0, m: 0 }).add(1, "days"),
    ];
    //for some reason when you omit the a at the end
    // it gets translated back to 12PM dude idk...
    if (day && night) {
      return [
        set[0].format("YYYY-MM-DD hh:mm:ss a"),
        set[2].format("YYYY-MM-DD hh:mm:ss a"),
      ];
    } else if (day === true) {
      return [
        set[0].format("YYYY-MM-DD hh:mm:ss a"),
        set[1].format("YYYY-MM-DD hh:mm:ss a"),
      ];
    }

    return [
      set[1].format("YYYY-MM-DD hh:mm:ss a"),
      set[2].format("YYYY-MM-DD hh:mm:ss a"),
    ];
  };

  isBetween = (workblock, timelineRange) => {
    const startTime = moment(workblock.startTime);
    const endTime = moment(workblock.endTime);
    return (
      startTime.isBetween(moment(timelineRange[0]), moment(timelineRange[1])) ||
      endTime.isBetween(moment(timelineRange[0]), moment(timelineRange[1]))
    );
  };

  render() {
    const { workblocks, shiftFilter, theDate, isMobile } = this.props;
    const timelineRange = this.getTimelineRange(shiftFilter);
    return (
      <ul className="timeslots">
        {workblocks.map((workblock, index) => {
          console.log("TheWorkblock: ", timelineRange[0].toString());
          return (
            //if the user works outside of the time range dont render them
            this.isBetween(workblock, timelineRange) && (
              <li key = {workblock.wbId}>
              <TimeSlot
              index = {index}
                dates={arrayOfDates()}
                availableTimes={timelineRange}
                startTime={workblock.startTime}
                endTime={workblock.endTime}
                shiftFilter={shiftFilter}
                user={workblock.user}
                isMobile={isMobile}
              />
              </li>
            )
          );
        })}
      </ul>
    );
  }
}

export default TimeSlots;
