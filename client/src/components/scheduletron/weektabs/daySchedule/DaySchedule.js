import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./daySchedule.css";
import { StyledHamburgerButton, StyledPaper } from "./StyledComponents";
import Functions from "../functions/Functions";
import TheDrawer from "./drawer/TheDrawer";
import menuIcon from "./assets/Menu Icon.svg";
import MyTable from "./table/TimeSlotsTable";
import dayjs from "dayjs";

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

function DaySchedule() {
  //UTILITIES
  const dispatch = useDispatch();

  //GLOBAL STATE
  const screenWidth = useSelector((state) => state.screenWidth);
  const currentSchedule = useSelector((state) => state.currentSchedule);
  const selectedWeek = useSelector((state) => state.selectedWeek);
  const currentDay = selectedWeek.week.find(
    ({ id }) => id === currentSchedule.dayId
  );

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
          setRedirect(<Redirect to={"/scheduletron"} />);
        }
      });
  }, [currentDay, dispatch]);
  //FOR RENDER
  const isDesktop = screenWidth >= 600;

  return (
    (currentSchedule.scheduled > 0 || currentSchedule.notScheduled) && (
      <StyledPaper key={currentDay.id}>
        {redirect}
        {/**  <MyTable date={currentDay.date} />*/}
        <p>
          Et laborum velit dolore officia incididunt voluptate duis adipisicing
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
      </StyledPaper>
    )
  );
}

export default DaySchedule;
