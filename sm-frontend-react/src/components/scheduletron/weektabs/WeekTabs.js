import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import MainContent from "./MainContent";
import { useSelector, useDispatch } from "react-redux";
import { StyledPaper, StyledTab, StyledTabs } from "./StyledComponents";



//ACTIONS
function updateSelectedWeek(newWeek) {
  return { type: "UPDATE_SELECTED_WEEK", payLoad: newWeek };
}

function updateCurrentDayId(newId) {
  return { type: "UPDATE_DAY_ID", payLoad: newId };
}

const TabsContainer = ({ weekId, dayId, screenWidth }) => {
  //dayId is the source for all day changes

  const dispatch = useDispatch();

  //GLOBAL STATE
  const selectedWeek = useSelector((state) => state.selectedWeek);
  const currentSchedule = useSelector((state) => state.currentSchedule);
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
    const currentDay = selectedWeek.week[currentDayIndex];
    const isDesktop = screenWidth >= 600;
    const days = selectedWeek.week;
    return (
      redirect ||
      (days && (
        <StyledPaper>
          <StyledTabs variant="scrollable" value={currentDayIndex}>
            {/*You might want to separate this and define the Tabs above 
              but DONOT. For some reason the scrollbuttons dont work or the indicator*/}
            {days.map(({id, day, month, weekday}) => (
              <StyledTab
                value={index}
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

          <MainContent day={days.find(({id})=>id === currentDayId)} isDesktop={isDesktop} />
        </StyledPaper>
      ))
    );
  }
  return null;
};

export default TabsContainer;
