import React, { useState, useEffect } from "react";
import "./daySchedule.css";
import Functions from "../functions/Functions";
import TheDrawer from "./drawer/TheDrawer";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Paper, Button } from "@material-ui/core";
import menuIcon from "./assets/Menu Icon.svg";
import styled from "@emotion/styled";
import MyTable from "./table/TimeSlotsTable";
import moment from "moment";


const DaySchedule = ({ day, isDesktop }) => {



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
      {/*Has Timeline and Timeslots */}
      <MyTable dayId={day.id} />

 
      <HamburgerButton
        onClick={() => setCurrentFunction(0)}
        hidden={typeof currentFunction !== "number" && isDesktop}
      >
        <img alt = 'Menu' src={menuIcon} />
      </HamburgerButton>
    
    </Paper>
  );
};

export default DaySchedule;
