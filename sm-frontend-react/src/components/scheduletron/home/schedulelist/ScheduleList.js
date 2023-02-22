import React from "react";
import ScheduleLink from "./ScheduleLink";
import moment from "moment";

function ScheduleList({ weeks }) {
  return (
    <ul className="home-list">
      {weeks.map(({ week, timeFrame, staffing, id }) => {
        const startDate = moment(week[0].date).format('M/D') ;
        const endDate = moment(week[6].date).format('M/D');
        const completion = Math.round(
          (staffing.actual / staffing.projected) * 100
        );
        return (
          <li key={id} className="home-schedule">
            <p className="timeframe">{timeFrame}</p>
            <ScheduleLink
              key={id}
              startDate={startDate}
              endDate={endDate}
              completion={completion}
              mondayId={week[0].id}
              id={id}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ScheduleList;
