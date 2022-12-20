import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import DaySchedule from "./daySchedule/DaySchedule";
import { useSelector, useDispatch } from "react-redux";
import { StyledPaper, StyledTab, StyledTabs } from "./StyledComponents";


//ACTIONS ////////////////////////
function updateSelectedWeek(newWeek) {
  return { type: "UPDATE_SELECTED_WEEK", payLoad: newWeek };
}

function updateCurrentDayId(dayId) {
  return { type: "UPDATE_DAY_ID", payLoad: dayId };
}


const TabsContainer = (props) => {
  //The url is the basis of all changes to week
  //and day

  //UTILITIES
  const dispatch = useDispatch();

  //GLOBAL STATE
  const selectedWeek = useSelector((state) => state.selectedWeek);
  const currentSchedule = useSelector((state) => state.currentSchedule);
  const screenWidth = useSelector((state) => state.screenWidth);
  //STATE
  const [redirect, setRedirect] = useState(null);
  const [currentDay, setCurrentDay] = useState({ id: null });

  //SIDE EFFECTS
  function updateState() {
    //fetches a weekSchedule and updates week and day
    fetch(`/get_week_schedule?week-id=${props.weekId}`)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          dispatch(updateSelectedWeek(response));
          //if day works it updates day in state
          //otherwise it assumes monday is the correct
          //day and it uses that id
          validateDayId(response.week, props.dayId);
        } else {
          setRedirect(<Redirect to="/scheduletron" />);
        }
      });
  }

  function validateDayId(week, dayId) {
    const day = week.find(({ id }) => id === dayId);
    if (day) {
      setCurrentDay(day);
      dispatch(updateCurrentDayId(day.id));
    } else {
      setRedirect(
        <Redirect to={`/scheduletron/viewer/${props.weekId}/${week[0].id}`} />
      );
    }
  }

  useEffect(() => {
    if (props.weekId !== selectedWeek.id) {
      updateState(props.weekId, props.dayId);
    } else if (props.dayId !== currentDay.id) {
      validateDayId(selectedWeek.week, props.dayId);
    }
  }, [props.weekId, props.dayId]);

  ////////////////////

  const currentDayExists = (id)=>Number.isInteger(id);
  return (
    <StyledPaper>
      {redirect}
       {currentDayExists(currentDay.id)  && (
        <>
          <StyledTabs variant="scrollable" value={currentSchedule.dayId}>
            {/*You might want to separate this and define the Tabs above 
              but DONOT. For some reason the scrollbuttons dont work or the indicator*/}
            {selectedWeek.week.map(({ id, day, month, weekday }) => (
              <StyledTab
                key={id}
                value={id}
                component={Link}
                to={`/scheduletron/viewer/${props.weekId}/${id}`}
                label={
                  <p>
                    <span className="weekday">{weekday},</span>
                    {month}/{day}
                  </p>
                }
              />
            ))}
          </StyledTabs>
          <DaySchedule currentDay={currentDay} isDesktop={screenWidth >= 600} />
        </>
      )}
    </StyledPaper>
  );
};

export default TabsContainer;
