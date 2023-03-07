import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import "./home.css";
import ScheduleList from "./schedulelist/ScheduleList";
import styled from "@emotion/styled";
import fileIcon from "./assets/File Icon.svg";
import MyDatePicker from "./MyDatePicker";

const StyledBox = styled(Box)({
  display: "flex",
  flex: 1,
  background: " rgba(81 ,99, 109, .17)",
  justifyContent: "center",
});

function Home() {
  const [weeks, setWeeks] = useState(null);

  useEffect(() => {
    /*This would request for today but not yet
      it initializes the schedule set which is an array of
      5 or so weekSchedules
    */
    fetchWeekSchedules();
  }, []);

  function fetchWeekSchedules() {
    fetch("/api/get_week_schedules")
      .then((response) => response.json())
      .then((weeks) => {
        setWeeks(weeks);
      });
  }

  function postNewWeek(date) {
    //take the date, add it to db, add that to list of weeks
    fetch("/api/create_week_schedule", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(date),
    })
      .then((response) => response.json())
      .then((newWeek) => fetchWeekSchedules());
  }

  return (
    weeks && (
      <StyledBox>
        <div className="scheduletron-home">
          <img className="file-icon" alt="File" src={fileIcon} />
          <div className={"header"}>
            <h1>
              To start, select a schedule to <b>view</b> or <b>edit</b>
            </h1>
          </div>
          <MyDatePicker />
          <ScheduleList weeks={weeks} postNewWeek={postNewWeek} />
        </div>
      </StyledBox>
    )
  );
}

export default Home;
