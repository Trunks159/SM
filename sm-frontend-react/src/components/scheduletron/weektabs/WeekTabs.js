import React, { useState, useEffect } from "react";
import "./weektabs.css";
import { Redirect, Link } from "react-router-dom";
import {styled} from "@material-ui/core";
import { Tabs, Tab, Paper } from "@material-ui/core";
import { Collapse } from "@mui/material";
import MainContent from "./MainContent";
import { useSelector, useDispatch } from "react-redux";

const styles = ()=>({
  root: {
    justifyContent: "center",
    background: "white",
  },
  scroller: {
    flexGrow: "0",
  },

  tabLink: {

  },
});

const StyledTabs = styled(Tabs)({
  height: 80,
  "& .MuiTabs-flexContainer": {
    gap: 10,
    height: "100%",
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
});

const StyledTab = styled(Tab)({
  textTransform: "none",
  transitionDuration: ".25s",
  background: "#275C78",
  margin: "0px 12.5px",
  borderRadius: "7px 7px 0px 0px",
  minWidth: 150,
  padding: "0px 20px",
  '&:hover':{
    opacity : 1
  },
  '& .tab-link':{
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

})



//ACTIONS
function updateSelectedWeek(newWeek) {
  return { type: "UPDATE_SELECTED_WEEK", payLoad: newWeek };
}

function updateCurrentDayIndex(newIndex) {
  return { type: "UPDATE_CURRENT_DAY_INDEX", payLoad: newIndex };
}

const TabsContainer = ({ weekId, dayIndex, screenWidth }) => {
  //dayIndex is the source for all day changes

  const classes = styles();
  const dispatch = useDispatch();

  //GLOBAL STATE
  const selectedWeek = useSelector((state) => state.selectedWeek);
  const currentDayIndex = useSelector((state) => state.currentDayIndex);

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
    } else {
      if (selectedWeek.id !== weekId) {
        fetchWeekSchedule(weekId);
      }
    }

    if (dayIndex !== currentDayIndex) {
      dispatch(updateCurrentDayIndex(dayIndex));
    }
  }, [weekId, dayIndex]);

  if (currentDayIndex !== null && selectedWeek !== null) {
    //STUFF DEPENDENT ON PROPS OR STATE
    const currentDay = selectedWeek.week[currentDayIndex];
    const isDesktop = screenWidth > 600;
    const days = selectedWeek.week;
    return (
      redirect ||
      (days && (
        <Paper className="tabs-container">
          <StyledTabs
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            value={currentDayIndex}
     
            style={{ display: isDesktop ? "flex" : "none" }}
          >
            {/*You might want to separate this but DONOT. For some reason 
    the scrollbuttons dont work or the indicator*/}
            {days.map((d, index) => {
              const isActive = index === currentDayIndex;
              return (
                <StyledTab
                  
                  value={index}
                  sx={{
        
                    opacity: isActive ? 1 : 0.5,
                  }}
                  label={
                    <Link
                      className='tab-link'
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
          </StyledTabs>

          <MainContent day={currentDay} isDesktop={isDesktop} />
        </Paper>
      ))
    );
  }
  return null;
};

export default TabsContainer;
