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
    
    let { theDate } = moment('2021-09-13 08:00:00', 'YYYY-MM-DD hh:mm:ss');
    console.log('MyDate: ',theDate)
    const set = [
      theDate.clone().set({h:8, m:0}),
      theDate.clone().set({ h: 16, m: 0 }),
      theDate.clone().set({ h: 0, m: 0 }).add(1, "days"),
    ];
    if (day && night) {
      return [set[0].format('YYYY-MM-DD hh:mm:ss'), set[2].format('YYYY-MM-DD hh:mm:ss')];
    } else if (day === true) {
      return [set[0].format('YYYY-MM-DD hh:mm:ss'), set[1].format('YYYY-MM-DD hh:mm:ss')];
    }
    return [set[1].format('YYYY-MM-DD hh:mm:ss'), set[2].format('YYYY-MM-DD hh:mm:ss')];
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
              moment(timelineRange[0]),
              moment(timelineRange[1])
            ) ||
              workblock.endTime.isBetween(
                moment(timelineRange[0]),
                moment(timelineRange[1])
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
