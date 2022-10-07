import React, { Component, useState, useEffect } from "react";
import "./weektabs.css";
import { Redirect, withRouter, Link } from "react-router-dom";
import { Tabs, Tab, Collapse, makeStyles } from "@mui/material";
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
})

const TabsContainer = (props)=>{
  const {screenWidth, classes, weekId, dayIndex} = props;
  const isDesktop = screenWidth > 600;
  const { days, currentDay, currentTab, redirect } = this.state;
  console.log("Duh props: ", currentDay);
  
  const fetchWeekSchedule = (weekId) => {
    fetch(`/get_week_schedule?week-id=${weekId}`)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          this.props.setSelectedWeek({
            week: response.week,
            id: response.id,
          });
        } else {
          this.setState({ redirect: <Redirect to="/scheduletron" /> });
        }
      });
  };

  useEffect(()=>{
    const { weekId, dayIndex, days, weeks, selectedWeek } = props;

    /*If days changes, update days and set current day to new dayindex
      If weekID changes likely because of a route change, call parent function and set the week,
      if u cant find the week make a api call

      if dayindex changes, update the tabs and such

      how can i  not be so reliant on these side effects?
      possibly with redux?

      If the selected week changes in redux, ill still have to update various components with side effects
      
    */
    if (days !== props.days) {
      setState({
        days: days,
        currentDay: days[dayIndex],
      });
      setDays(props.days);
      setCurrentDay( props.days[dayIndex]);
    }

    if (
      prevProps.weekId !== weekId
    ) {
      const theWeek = weeks.find((w) => (w.id = weekId));
      if (theWeek) {
        this.props.setSelectedWeek(theWeek);
      } else {
        this.fetchWeekSchedule(weekId);
      }
    }

    if (prevProps.dayIndex !== this.props.dayIndex) {
      this.changeTab(0, this.props.dayIndex);
    }
  }, [props.days])

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
}



class TabsContainer extends Component {
  state = {
    currentTab: this.props.dayIndex,
    currentDay: this.props.days && this.props.days[this.props.dayIndex],
    days: this.props.days,
    redirect: false,
  };

  changeTab = (e, newTab) => {
    this.setState({
      currentTab: newTab,
      currentDay: this.state.days[newTab],
    });
  };

  componentDidMount = () => {
    console.log("Unmounting1234:");
    const { weekSchedule, weekId } = this.props;

    if (Boolean(weekSchedule) === false) {
      this.fetchWeekSchedule(weekId);
    } else if (weekSchedule.id !== weekId) {
      this.fetchWeekSchedule(weekId);
    }
  };



  componentDidUpdate = (prevProps) => {

  };



  }
}

export default withRouter(TabsContainer);
