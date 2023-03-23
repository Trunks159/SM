import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import "./home.css";
import ScheduleList from "./schedulelist/ScheduleList";
import styled from "@emotion/styled";
import fileIcon from "./assets/File Icon.svg";
import MyDatePicker from "./MyDatePicker";
import dayjs from "dayjs";

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

    fetchWeeks();
  }, []);

  function fetchWeeks() {
    const thisMonday = dayjs()
      .startOf("week")
      .add(1, "days")
      .startOf("day")
      .format();
    const minDate = dayjs(thisMonday).subtract(2, "weeks").format();
    fetch(`/api/weeks?min-date=${minDate}`).then((response) =>
      response.json().then((data) => {
        if (response.ok) {
          //make sure it has today in it, if so, set weeks
          //program automatically makes this week if not found
          console.log("This monday: ", thisMonday, " Weeks :", data);
          const thisWeek = data.find(
            (data) => dayjs(data.mondayDate).format() === thisMonday
          );

          if (thisWeek) {
            return setWeeks(data);
          }
        }
        postNewWeek(thisMonday);
      })
    );
  }

  function postNewWeek(date) {
    //take the date, add it to db, add that to list of weeks

    fetch("/api/weeks", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(date),
    }).then((response) =>
      response.json().then((data) => {
        if (response.ok) {
          return fetchWeeks();
        }
        throw new Error(data);
      })
    );
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
