import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./daySchedule.css";
import { StyledPaper } from "./StyledComponents";
import moment from "moment";
import Functions from "../functions/Functions";

//ACTIONS
const initializeSchedule = ({ scheduled, notScheduled, timeRange }) => {
  return {
    type: "INITIALIZE_SCHEDULE",
    payLoad: { scheduled, notScheduled, timeRange },
  };
};

//Request scheduled and notscheduled from flask
//change whenever the day changes

function DaySchedule({ currentDay, isDesktop }) {
  const [redirect, setRedirect] = useState(null);
  const [currentFunction, setCurrentFunction] = useState(null);
  //for now this is the timerange but it will be changed
  // to something more dynamic
  const currentSchedule = useSelector((state) => state.currentSchedule);
  const dispatch = useDispatch();
  function getTimeRange(date) {
    return [
      moment(date).clone().set({ h: 0, m: 0 }).format("YYYY-MM-DD hh:mm:ss a"),
      moment(date)
        .clone()
        .set({ h: 0, m: 0 })
        .add(1, "days")
        .format("YYYY-MM-DD hh:mm:ss a"),
    ];
  }

  useEffect(() => {
    //do this whenever schedule changes
    //so i guess it could be whenever dayid of
    //schedule changes
    console.log('I run infinitely')
    fetch(`/get_schedule/${currentDay.id}`)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          dispatch(
            initializeSchedule({
              scheduled: response.scheduled,
              notScheduled: response.notScheduled,
              timerange: getTimeRange(currentDay.date),
            })
          );
        } else {
          
          setRedirect(<Redirect to={"/scheduletron"} />);
        }
      });
  }, [currentDay, dispatch]);
  return (
    <StyledPaper key={currentDay.id} elevation={1}>
      {redirect}
      <Functions
        hidden={!isDesktop}
        changeCurrentFunction={setCurrentFunction}
        currentFunction={currentFunction}
      />
    </StyledPaper>
  );
}

export default DaySchedule;
