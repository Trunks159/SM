import React, { useState, useEffect } from "react";
import "./daySchedule.css";
import Functions from "../functions/Functions";
import TheDrawer from "../drawer/TheDrawer";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Paper, Button } from "@material-ui/core";
import menuIcon from "./assets/Menu Icon.svg";
import styled from "@emotion/styled";
import MyTable from "./table/TimeSlotsTable";
import moment from "moment";

const HamburgerButton = styled(Button)(({ hidden }) => {
  return {
    display: hidden ? "none" : "flex",
    background: "#585858",
    position: "absolute",
    bottom: 13,
    right: 13,
    "&:hover": {
      background: "black",
    },
  };
});

//ACTIONS
const initializeSchedule = ({ dayId, scheduled, notScheduled, timeRange }) => {
  return {
    type: "INITIALIZE_SCHEDULE",
    payLoad: { dayId, scheduled, notScheduled, timeRange },
  };
};

const DaySchedule = ({ day, isDesktop }) => {
  const [redirect, setRedirect] = useState(null);
  const [currentFunction, setCurrentFunction] = useState(null);
  console.log("Mommy: ", day);
  //for not this is the timerange but it will be changed
  // to something more dynamic
  const timerange = [
    moment(day.date)
      .clone()
      .set({ h: 0, m: 0 })
      .format("YYYY-MM-DD hh:mm:ss a"),
    moment(day.date)
      .clone()
      .set({ h: 0, m: 0 })
      .add(1, "days")
      .format("YYYY-MM-DD hh:mm:ss a"),
  ];
  const dispatch = useDispatch();

  const setUpState = () => {
    fetch(`/get_schedule/${day.id}`)
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          const { scheduled, notScheduled } = res;
          dispatch(
            initializeSchedule({
              dayId: day.id,
              scheduled: scheduled,
              notScheduled,
              timerange: timerange,
            })
          );
        } else {
          setRedirect(true);
        }
      });
  };

  useEffect(() => {
    setUpState();
  }, [day]);

  return (
    <Paper
      key={day.id}
      elevation={1}
      style={{
        position: "relative",
        flexDirection: "column",
        flex: 1,
        background: "#F5F5F5",
        display: "flex",
      }}
    >
      {redirect && <Redirect to={"/scheduletron"} />}

      {/*Has Timeline and Timeslots */}
      <MyTable dayId={day.id} />

      <Functions
        hidden={!isDesktop}
        changeCurrentFunction={setCurrentFunction}
        currentFunction={currentFunction}
      />
      <HamburgerButton
        onClick={() => setCurrentFunction(0)}
        hidden={typeof currentFunction !== "number" && isDesktop}
      >
        <img alt = 'Menu' src={menuIcon} />
      </HamburgerButton>
      <TheDrawer
        date={day.date}
        changeCurrentFunction={setCurrentFunction}
        currentFunction={currentFunction}
      />
    </Paper>
  );
};

export default DaySchedule;
