import React from "react";
import ScheduleLink from "./ScheduleLink";

function ScheduleList({ weeks }) {
  return (
    <ul className="home-list">
      {weeks.map(({ week, timeFrame, staffing, id }) => {
        const startDate = `${week[0].month}/${week[0].day}`;
        const endDate = `${week[6].month}/${week[6].day}`;
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
