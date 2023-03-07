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
        {/**  <MyTable date={currentDay.date} />*/}
        <p>
          Ea dolore elit duis enim proident culpa do. Occaecat do fugiat esse
          laborum dolore cillum do ex esse elit. Aliquip adipisicing consectetur
          incididunt eu elit sunt elit id do excepteur consectetur nisi. Veniam
          qui consequat id esse incididunt anim cupidatat cillum mollit nostrud
          Lorem sit dolor Lorem. Dolore exercitation ullamco sint ullamco
          occaecat aliqua amet in sint velit labore amet.Sunt voluptate aliqua
          labore eiusmod aute exercitation tempor consequat qui cupidatat
          reprehenderit dolor ad. Sit nisi sint nisi esse reprehenderit do
          labore aute enim occaecat mollit sint aliquip culpa. Irure qui ea enim
          Lorem ex do ex commodo tempor aliquip veniam. Aliqua do laborum
          consectetur id do exercitation dolor dolor laborum deserunt incididunt
          sit non cupidatat. Deserunt cillum aute ex eiusmod ad dolore est sit
          dolor cupidatat.
        </p>

        <Functions
          isReadOnly={currentSchedule.isReadOnly(currentDay.date)}
          date={currentDay.date}
          hidden={!isDesktop}
          changeCurrentFunction={setCurrentFunction}
          currentFunction={currentFunction}
        />
        {/**   <StyledHamburgerButton
        onClick={() => setCurrentFunction("team")}
        hidden={
          //needs to be in mobile AND cant be open
          (typeof currentFunction !== "string" ||
            !(currentFunction instanceof String)) &&
          isDesktop
        }
      >
        <img alt="Menu" src={menuIcon} />
      </StyledHamburgerButton>
      <TheDrawer
        isReadOnly={currentSchedule.isReadOnly(currentDay.date)}
        date={currentDay.date}
        changeCurrentFunction={setCurrentFunction}
        currentFunction={currentFunction}
      />*/}
      </Paper>
    )
  );
}

export default DaySchedule;
