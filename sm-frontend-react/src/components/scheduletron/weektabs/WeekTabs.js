import React, { Component, useState, useEffect } from "react";
import "./weektabs.css";
import { Redirect, withRouter, Link } from "react-router-dom";
import {
  Tabs,
  Tab,
  Collapse,
  makeStyles,
  stepButtonClasses,
} from "@mui/material";
import { Paper, withStyles } from "@material-ui/core";
import MainContent from "./MainContent";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles({
  root: {
    justifyContent: "center",
    background: "white",
  },
  scroller: {
    flexGrow: "0",
  },
  tab: {
    textTransform: "none",
    transitionDuration: ".25s",
    background: "#275C78",
    margin: "0px 12.5px",
    borderRadius: "7px 7px 0px 0px",
    minWidth: 150,
    padding: "0px 20px",
  },
  tabLink: {
    flex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    color: "white",
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    fontSize: "32px",
  },
  tabs: {
    height: 80,
    "& .MuiTabs-flexContainer": {
      gap: 10,
      height: "100%",
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
  },
});

const TabsContainer = ({ weekId, dayIndex }) => {
  //the day is mostly controlled by the dayIndex. If that changes,
  //so does the day, the day effectively never gets changed outside of
  //a change in the url

  const classes = useStyles();

  const screenWidth = useSelector((state) => state.screenWidth);
  const selectedWeek = useSelector((state) => state.selectedWeek);
  const currentDay = useSelector((state) => state.currentDay);
  //pure conjecture
  const currentTab = currentDay.index;
  const isDesktop = screenWidth > 600;
  const days = selectedWeek.week;

  const fetchWeekSchedule = (weekId) => {
    fetch(`/get_week_schedule?week-id=${weekId}`)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          setSelectedWeek({
            week: response.week,
            id: response.id,
          });
        } else {
          setRedirect({ redirect: <Redirect to="/scheduletron" /> });
        }
      });
  };

  useEffect(() => {
    const { weekId, dayIndex, days, weeks, selectedWeek } = props;
    if (selectedWeek.id !== weekId) {
      fetchWeekSchedule(weekId);
    }
    /*If weekid changes this likely means just the url changes,
    which will likely require you to make an api call
    */

    if (prevProps.dayIndex !== this.props.dayIndex) {
      this.changeTab(0, this.props.dayIndex);
    }
  }, [weekId]);

  useEffect(() => {
    if (selectedWeek) {
      dipatch(updateCurrentDay(selectedWeek[dayIndex]));
    }
  }, dayIndex);

  return (
    redirect ||
    (days && (
      <Paper className="tabs-container">
        <Tabs
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          onChange={this.changeTab}
          value={currentTab}
          className={classes.tabs}
          style={{ display: isDesktop ? "flex" : "none" }}
        >
          {/*You might want to separate this but DONOT. For some reason 
  the scrollbuttons dont work or the indicator*/}
          {days.map((d, index) => {
            const isActive = index === dayIndex;
            return (
              <Tab
                className={classes.tab}
                value={index}
                sx={{
                  opacity: isActive ? 1 : 0.5,
                }}
                label={
                  <Link
                    className={classes.tabLink}
                    to={`/scheduletron/viewer/${weekId}/${index}`}
                  >
                    <Collapse orientation={"horizontal"} in={isActive}>
                      <p style={{ marginRight: 7 }}>{d.weekday} </p>
                    </Collapse>

                    <p>{`${d.month}/${d.day}`}</p>
                  </Link>
                }
              />
            );
          })}
        </Tabs>

        <MainContent day={currentDay} isDesktop={isDesktop} />
      </Paper>
    ))
  );
};

export default TabsContainer;
