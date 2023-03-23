import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { StyledPaper, StyledTab, StyledTabs } from "./StyledComponents";
import dayjs from "dayjs";
import DaySchedule from "./dayschedule/DaySchedule";
import { Collapse } from "@mui/material";

//ACTIONS ////////////////////////

function updateAlert(newAlert) {
  return { type: "UPDATE_ALERT", payLoad: newAlert };
}

//change week, change day, alert
function newWeek(week, dayId) {
  return {
    type: "NEW_WEEK",
    payLoad: {
      week,
      dayId,
    },
  };
}

function newDay(dayId) {
  return {
    type: "NEW_DAY",
    payLoad: dayId,
  };
}

function Scheduletron(props) {
  //The url is the basis of all changes to week and day

  //UTILITIES
  const dispatch = useDispatch();

  //GLOBAL STATE
  const week = useSelector((state) => state.selectedWeek);
  const currentSchedule = useSelector((state) => state.currentSchedule);

  //LOCAL STATE
  const [redirect, setRedirect] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);

  //SIDE EFFECTS
  function fetchWeek(date) {
    const url = `/api/weeks?date=${dayjs(date).format()}`;
    fetch(url).then((response) =>
      response.json().then((data) => {
        if (response.ok) {
          const day = data.days.find(({ date }) => date === props.date);
          setCurrentDay(day);
          return dispatch(newWeek(data, day.id));
        }
        dispatch(
          updateAlert({
            content: "Couldn't find the week im sorry...",
            severity: "error",
            title: "Error",
          })
        );
        setRedirect(<Redirect to="/" />);
      })
    );
  }

  useEffect(() => {
    if (!week) {
      fetchWeek(props.date);
    } else {
      const day = week.days.find(({ date }) => date === props.date);
      if (!day) {
        fetchWeek(props.date);
      } else {
        dispatch(newDay(day.id));
        setCurrentDay(day);
      }
    }
  }, [props.date]);

  useEffect(() => {
    if (redirect && currentDay.id) {
      setRedirect(null);
    }
  }, [redirect]);

  ////////////////////
  return (
    week &&
    currentDay && (
      <StyledPaper>
        {redirect}
        <StyledTabs variant="scrollable" value={currentSchedule.dayId}>
          {week.days.map(({ id, date }) => {
            const theDate = dayjs(date);
            return (
              <StyledTab
                key={id}
                value={id}
                component={Link}
                to={`/scheduletron/${theDate.format("YYYY-MM-DD")}`}
                label={
                  <span className="tab-label">
                    <Collapse
                      orientation="horizontal"
                      in={id === currentDay.id}
                    >
                      {theDate.format("dddd")},
                    </Collapse>
                    {theDate.format("M/D")}
                  </span>
                }
              />
            );
          })}
        </StyledTabs>
        <DaySchedule currentDay={currentDay} />
      </StyledPaper>
    )
  );
}

export default Scheduletron;
