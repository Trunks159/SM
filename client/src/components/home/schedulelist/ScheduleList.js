import React from "react";
import ScheduleLink from "./ScheduleLink";
import { Link } from "react-router-dom";
import AddScheduleButton from "./AddScheduleButton";
import dayjs from "dayjs";

function ScheduleList({ weeks, postNewWeek }) {
  function getTimeFrame(datetime) {
    //takes datetime and compares it to today
    //returns string like 'This Week' or whatever
    const thisMonday = dayjs().startOf("week").add(1, "days");
    const uniqueNames = { 0: "This Week", "-1": "Next Week", 1: "Last Week" };
    const difference = thisMonday.diff(dayjs(datetime), "weeks");
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
        {weeks.map(({ days, completion, id }) => {
          const startDate = dayjs(days[0].date).format("M/D");
          const endDate = dayjs(days[6].date).format("M/D");
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
        postNewWeek={postNewWeek}
        weeks={weeks}
      />
    </div>
  );
}

export default ScheduleList;
