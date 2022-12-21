import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./daySchedule.css";
import { StyledHamburgerButton, StyledPaper } from "./StyledComponents";
import moment from "moment";
import Functions from "../functions/Functions";
import TheDrawer from "./drawer/TheDrawer";
import menuIcon from "./assets/Menu Icon.svg";
import MyTable from "./table/TimeSlotsTable";

//ACTIONS
const initializeSchedule = ({ scheduled, notScheduled, timerange }) => {
  return {
    type: "INITIALIZE_SCHEDULE",
    payLoad: { scheduled, notScheduled, timerange },
  };
};

//PURE FUNCTIONS

function getTimerange(date) {
  //for now this is the timerange but it will be changed
  // to something more dynamic
  return [
    moment(date).clone().set({ h: 0, m: 0 }).format("YYYY-MM-DD hh:mm:ss a"),
    moment(date)
      .clone()
      .set({ h: 0, m: 0 })
      .add(1, "days")
      .format("YYYY-MM-DD hh:mm:ss a"),
  ];
}

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
    fetch(`/get_schedule/${currentDay.id}`)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          dispatch(
            initializeSchedule({
              scheduled: response.scheduled,
              notScheduled: response.notScheduled,
              timerange: getTimerange(currentDay.date),
            })
          );
        } else {
          setRedirect(<Redirect to={"/scheduletron"} />);
        }
      });
  }, [currentDay, dispatch]);
  //FOR RENDER
  const isDesktop = screenWidth >= 600;
  return (
    currentSchedule.timerange.length > 0 && (
      <StyledPaper key={currentDay.id} elevation={1}>
        {redirect}
        <MyTable />
        <Functions
          hidden={!isDesktop}
          changeCurrentFunction={setCurrentFunction}
          currentFunction={currentFunction}
        />
        <TheDrawer
          date={currentDay.date}
          changeCurrentFunction={setCurrentFunction}
          currentFunction={currentFunction}
        />
        <StyledHamburgerButton
          onClick={() => setCurrentFunction(0)}
          hidden={typeof currentFunction !== "number" && isDesktop}
        >
          <img alt="Menu" src={menuIcon} />
        </StyledHamburgerButton>
      </StyledPaper>
    )
  );
}

export default DaySchedule;
