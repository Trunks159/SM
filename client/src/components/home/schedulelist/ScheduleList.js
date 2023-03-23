import React from "react";
import ScheduleLink from "./ScheduleLink";
import { Link } from "react-router-dom";
import AddScheduleButton from "./AddScheduleButton";
import dayjs from "dayjs";

function ScheduleList({ weeks, postNewWeek }) {
  function getDefaultDate(weeks) {
    //start at this week and add weeks till you get a free week
    const thisMonday = dayjs().startOf("day").startOf("week").add(1, "days");
    let next = thisMonday;
    while (true) {
      if (!weeks.find(({ mondayDate }) => mondayDate === next.format())) {
        return next.format();
      }
      next = next.add(1, "weeks");
    }
  }

  function getTimeFrame(datetime) {
    //takes datetime and compares it to today
    //returns string like 'This Week' or whatever
    const thisWeeksMonday = dayjs().day(1);
    const uniqueNames = { 0: "This Week", "-1": "Next Week", 1: "Last Week" };
    const difference = thisWeeksMonday
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)
      .diff(dayjs(datetime), "weeks");
    return (
      uniqueNames[difference.toString()] ||
      `${Math.abs(difference)} weeks ${difference < 0 ? "From Now" : "Ago"}`
    );
  }
  return (
    <div className="list">
      <Link className="view-all" to={"/"}>
        View All
      </Link>
      <ul className="home-list">
        {weeks.map(({ days, staffing, id }) => {
          const startDate = dayjs(days[0].date).format("M/D");
          const endDate = dayjs(days[6].date).format("M/D");
          const completion = Math.round(
            (staffing.actual / staffing.projected) * 100
          );
          const timeframe = getTimeFrame(days[0].date);

          return (
            <ScheduleLink
              key={id}
              startDate={startDate}
              endDate={endDate}
              completion={completion}
              monday={days[0]}
              id={id}
              timeframe={timeframe}
              days={days}
            />
          );
        })}
      </ul>
      <AddScheduleButton
        //1 week after the last week we have made already
        defaultDate={getDefaultDate(weeks)}
        postNewWeek={postNewWeek}
        weeks={weeks}
      />
    </div>
  );
}

export default ScheduleList;
