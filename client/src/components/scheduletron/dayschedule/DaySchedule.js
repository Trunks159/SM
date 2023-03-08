import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { Paper } from "@mui/material";
import { StyledHamburgerButton } from "../StyledComponents";
import Functions from "./functions/Functions";
import menuIcon from "./assets/Menu Icon.svg";
import MyTable from "./table/TimeSlotsTable";

import "./daySchedule.css";

//ACTIONS
const initializeSchedule = ({ scheduled, notScheduled }) => {
  return {
    type: "INITIALIZE_SCHEDULE",
    payLoad: { scheduled, notScheduled },
  };
};

const updateTimeRange = (timerange) => {
  return {
    type: "UPDATE_TIMERANGE",
    payLoad: timerange,
  };
};

const updateAlert = (newAlert) => {
  return {
    type: "UPDATE_ALERT",
    payLoad: newAlert,
  };
};

function DaySchedule({ currentDay }) {
  //UTILITIES
  const dispatch = useDispatch();

  //GLOBAL STATE
  const screenWidth = useSelector((state) => state.screenWidth);
  const currentSchedule = useSelector((state) => state.currentSchedule);
  const selectedWeek = useSelector((state) => state.selectedWeek);

  //STATE
  const [redirect, setRedirect] = useState(null);
  const [currentFunction, setCurrentFunction] = useState(null);

  //SIDE EFFECTS
  useEffect(() => {
    //do this whenever schedule changes
    //so i guess it could be whenever dayid of
    //schedule changes;
    fetch(`/api/get_schedule/${currentDay.id}`)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          dispatch(
            initializeSchedule({
              scheduled: response.scheduled,
              notScheduled: response.notScheduled,
            })
          );

          dispatch(
            updateTimeRange([
              dayjs(currentDay.date).startOf("day").format(),
              dayjs(currentDay.date).startOf("day").add(1, "days").format(),
            ])
          );
        } else {
          dispatch(
            updateAlert({
              content: "Couldnt find the day in question",
              severity: "error",
              title: "Error",
            })
          );
          setRedirect(<Redirect to={"/"} />);
        }
      });
  }, [currentDay, dispatch]);
  //FOR RENDER
  const isDesktop = screenWidth >= 600;

  return (
    (currentSchedule.scheduled > 0 || currentSchedule.notScheduled) && (
      <Paper style={{ display: "flex", flex: 1 }} key={currentDay.id}>
        {redirect}
        <MyTable date={currentDay.date} />

        <Functions
          isReadOnly={currentSchedule.isReadOnly(currentDay.date)}
          date={currentDay.date}
          hidden={!isDesktop}
          changeCurrentFunction={setCurrentFunction}
          currentFunction={currentFunction}
        />
      </Paper>
    )
  );
}

export default DaySchedule;
