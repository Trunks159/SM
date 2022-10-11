import React, { useState, useEffect } from "react";
import "./weektabs.css";
import { Redirect, Link } from "react-router-dom";
import { Tabs, Tab, Collapse, Paper } from "@mui/material";
import { makeStyles } from "@material-ui/core";
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

//ACTIONS
function updateSelectedWeek(newWeek) {
  return { type: "UPDATE_SELECTED_WEEK", payload: newWeek };
}

function updateCurrentDay(newDay) {
  return { type: "UPDATE_CURRENT_DAY", payload: newDay };
}

const TabsContainer = ({ weekId, dayIndex }) => {
  //dayIndex is the source for all day changes

  const classes = useStyles();
  const dispatch = useDispatch();

  //GLOBAL STATE
  const screenWidth = useSelector((state) => state.screenWidth);
  const selectedWeek = useSelector((state) => state.selectedWeek);
  const currentDay = useSelector((state) => state.currentDay);

  //STATE
  const [redirect, setRedirect] = useState(null);

  function fetchWeekSchedule(weekId) {
    fetch(`/get_week_schedule?week-id=${weekId}`)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          dispatch(
            updateSelectedWeek({ week: response.week, id: response.id })
          );
        } else {
          setRedirect(<Redirect to="/scheduletron" />);
        }
      });
  }

  useEffect(() => {
    if (Boolean(selectedWeek) === false) {
      fetchWeekSchedule(weekId);
    }
    else{
      if (selectedWeek.id !== weekId) {
        fetchWeekSchedule(weekId);
      }
    }
  }, [weekId]);

  useEffect(() => {
    if (selectedWeek) {
      dispatch(updateCurrentDay(selectedWeek[dayIndex]));
    }
  }, [dayIndex]);

  if (currentDay && selectedWeek) {
    //STUFF DEPENDENT ON PROPS OR STATE
    const currentTab = currentDay.index; //I GUESS?
    const isDesktop = screenWidth > 600;
    const days = selectedWeek.week;
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
  return null;
};

export default TabsContainer;
