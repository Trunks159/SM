import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { StyledPaper, StyledTab, StyledTabs } from "./StyledComponents";
import dayjs from "dayjs";
import DaySchedule from "./dayschedule/DaySchedule";
import { Collapse } from "@mui/material";
//the logic for this took so long please dont try to refractor this im just done with this
//url is the source of all changes, child components are free to use the redux values
//autopilots to today if no weekid or dayid is used

//ACTIONS ////////////////////////
function updateSelectedWeek(newWeek) {
  return { type: "UPDATE_SELECTED_WEEK", payLoad: newWeek };
}

function updateCurrentDayId(dayId) {
  return { type: "UPDATE_DAY_ID", payLoad: dayId };
}

function updateAlert(newAlert) {
  return { type: "UPDATE_ALERT", payLoad: newAlert };
}

function Scheduletron(props) {
  //The url is the basis of all changes to week and day

  //UTILITIES
  const dispatch = useDispatch();

  //GLOBAL STATE
  const selectedWeek = useSelector((state) => state.selectedWeek);
  const currentSchedule = useSelector((state) => state.currentSchedule);

  //LOCAL STATE
  const [redirect, setRedirect] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);

  //SIDE EFFECTS
  function fetchWeekSchedule({ date, weekId }) {
    //fetches a weekSchedule and updates week and day
    const url =
      "/api/get_week_schedule" +
      `?${date ? "date" : "week-id"}=${date ? date : weekId}`;

    fetch(url)
      .then((response) => response.json())
      .then((verifiedWeek) => {
        if (verifiedWeek) {
          dispatch(updateSelectedWeek(verifiedWeek));

          return setRedirect(
            <Redirect
              to={`/scheduletron/${verifiedWeek.id}/${
                updateVerifiedDay(verifiedWeek).id
              }`}
            />
          );
        }
        dispatch(
          updateAlert({
            content: "Couldn't find the week im sorry...",
            severity: "error",
            title: "Error",
          })
        );
        setRedirect(<Redirect to="/" />);
      });
  }

  function updateVerifiedDay(
    verifiedWeek = selectedWeek,
    newId = props.dayId,
    oldId = currentSchedule.dayId
  ) {
    //takes dayId, searches the week we have, if found return
    //the found day else return monday
    //SIDEEFFECT FOR REDUX and Local state

    const day = verifiedWeek.week.find(({ id }) => id === newId);
    const verifiedDay =
      !props.dayId || !day
        ? verifiedWeek.week[dayjs().day() === 0 ? 6 : dayjs().day() - 1]
        : day;
    console.log("Youve been forwarded to todays schedule");
    if (verifiedDay.id !== oldId) {
      dispatch(updateCurrentDayId(verifiedDay.id));
    }
    if (!currentDay || verifiedDay.id !== currentDay.id) {
      setCurrentDay(verifiedDay);
    }
    return verifiedDay;
  }

  useEffect(() => {
    //fetchweekschedule also verifies dayid

    if (!props.weekId) {
      console.log("Ran", !props.weekId);
      fetchWeekSchedule({ date: dayjs().startOf("day").format() });
    } else if (!selectedWeek.id || props.weekId !== selectedWeek.id) {
      fetchWeekSchedule({ weekId: props.weekId });
    } else {
      updateVerifiedDay();
    }
  }, [props.weekId, props.dayId]);

  useEffect(() => {
    if (redirect && currentDay.id) {
      setRedirect(null);
    }
  }, [redirect]);

  ////////////////////
  return (
    redirect ||
    (currentDay && (
      <StyledPaper>
        <StyledTabs variant="scrollable" value={currentSchedule.dayId}>
          {selectedWeek.week.map(({ id, date }) => {
            const theDate = dayjs(date);
            return (
              <StyledTab
                key={id}
                value={id}
                component={Link}
                to={`/scheduletron/${selectedWeek.id}/${id}`}
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
    ))
  );
}

export default Scheduletron;
