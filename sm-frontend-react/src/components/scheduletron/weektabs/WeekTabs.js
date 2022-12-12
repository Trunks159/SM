import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import DaySchedule from "./daySchedule/DaySchedule";
import { useSelector, useDispatch } from "react-redux";
import { StyledPaper, StyledTab, StyledTabs } from "./StyledComponents";

//ACTIONS
function updateSelectedWeek(newWeek) {
  return { type: "UPDATE_SELECTED_WEEK", payLoad: newWeek };
}

function updateCurrentDayId(dayId) {
  return { type: "UPDATE_DAY_ID", payLoad: dayId };
}

const TabsContainer = ({ weekId, dayId }) => {
  //This dayId is the source for all day changes

  const dispatch = useDispatch();

  //GLOBAL STATE
  const selectedWeek = useSelector((state) => state.selectedWeek);
  const currentSchedule = useSelector((state) => state.currentSchedule);
  const screenWidth = useSelector((state) => state.screenWidth);
  const currentDayId = currentSchedule.dayId;

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

    if (dayId !== currentDayId) {
      dispatch(updateCurrentDayId(dayId));
    }
  }, [weekId, currentDayId]);

  if (currentDayId !== null && selectedWeek !== null) {
    //STUFF DEPENDENT ON PROPS OR STATE
    console.log("Duh week: ", selectedWeek.week);
    const days = selectedWeek.week;
    const isDesktop = screenWidth >= 600;
    return (
      days && (
        <StyledPaper>
          {redirect}
          <StyledTabs variant="scrollable" value={currentDayId}>
            {/*You might want to separate this and define the Tabs above 
              but DONOT. For some reason the scrollbuttons dont work or the indicator*/}
            {days.map(({ id, day, month, weekday }) => (
              <StyledTab
                value={id}
                currentDayId={currentDayId}
                component={Link}
                to={`/scheduletron/viewer/${weekId}/${id}`}
                label={
                  <p>
                    <span className="weekday">{weekday},</span>
                    {month}/{day}
                  </p>
                }
              />
            ))}
          </StyledTabs>

          <DaySchedule
            day={days.find(({ id }) => id === currentDayId)}
            isDesktop={isDesktop}
          />
        </StyledPaper>
      )
    );
  }
  return null;
};

export default TabsContainer;
