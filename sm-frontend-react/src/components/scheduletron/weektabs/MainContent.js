import React, { useState, useEffect } from "react";
import Vizualizer from "./visualizer/Visualizer";
import "./maincontent.css";
import Functions from "./functions/Functions";
import TheDrawer from "./drawer/TheDrawer";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Paper, Button } from "@material-ui/core";
import menuIcon from "./assets/Menu Icon.svg";
import styled from "@emotion/styled";

const HamburgerButton = styled(Button)(({ hidden }) => {
  console.log("Is it hidden: ", hidden);
  return {
    display: hidden ? "none" : "flex",
    background: "#585858",
    position: "absolute",
    bottom: 13,
    right: 13,
    '&:hover':{
      background : 'black',
    }
  };
});

//ACTIONS
const updateUsers = (newUsers) => {
  return {
    type: "UPDATE_ALL_USERS",
    payLoad: newUsers,
  };
};

const updateScheduled = (newScheduled) => {
  return {
    type: "UPDATE_SCHEDULED",
    payLoad: newScheduled,
  };
};

const updateNotScheduled = (newNotScheduled) => {
  return {
    type: "UPDATE_NOT_SCHEDULED",
    payLoad: newNotScheduled,
  };
};

const MainContent = ({ day, isDesktop }) => {
  const [redirect, setRedirect] = useState(null);
  const [currentFunction, setCurrentFunction] = useState(null);

  const allUsers = useSelector((state) => state.allUsers);
  const scheduled = useSelector((state) => state.scheduled);

  const dispatch = useDispatch();

  const setUpState = () => {
    fetch(`/get_schedule/${day.id}`)
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          const { allUsers, scheduled, notScheduled } = res;
          dispatch(updateUsers(allUsers));
          dispatch(updateScheduled(scheduled));
          dispatch(updateNotScheduled(notScheduled));
        } else {
          setRedirect(true);
        }
      });
  };

  useEffect(() => {
    setUpState();
  }, [day]);

  return (
    allUsers && (
      <Paper
        key={day.id}
        elevation={1}
        style={{
          position: "relative",
          flexDirection: "column",
          flex: 1,
          background: "#F5F5F5",
        }}
      >
        <div className="tab-maincontent">
          {redirect && <Redirect to={"/scheduletron"} />}

          <Vizualizer day={day} workblocks={scheduled} isDesktop={isDesktop} />

          <Functions
            hidden={!isDesktop}
            changeCurrentFunction={setCurrentFunction}
            currentFunction={currentFunction}
          />
          <HamburgerButton
            onClick={() => setCurrentFunction(0)}
            hidden={typeof currentFunction !== 'number' && isDesktop }
          >
            <img src={menuIcon} />
          </HamburgerButton>
          <TheDrawer
            date={day.date}
            changeCurrentFunction={setCurrentFunction}
            currentFunction={currentFunction}
          />
        </div>
      </Paper>
    )
  );
};

export default MainContent;
