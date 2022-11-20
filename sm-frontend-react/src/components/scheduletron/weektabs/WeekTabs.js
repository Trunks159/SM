import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import MainContent from "./MainContent";
import { useSelector, useDispatch } from "react-redux";
import { StyledPaper, StyledTab, StyledTabs } from "./StyledComponents";

//ACTIONS
function updateSelectedWeek(newWeek) {
  return { type: "UPDATE_SELECTED_WEEK", payLoad: newWeek };
}

function updateCurrentDayIndex(newIndex) {
  return { type: "UPDATE_CURRENT_DAY_INDEX", payLoad: newIndex };
}

const TabsContainer = ({ weekId, dayIndex, screenWidth }) => {
  //dayIndex is the source for all day changes

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
        <StyledPaper>
          <StyledTabs
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            value={currentDayIndex}

          
          >
            {/*You might want to separate this and define the Tabs above but DONOT. For some reason 
    the scrollbuttons dont work or the indicator*/}
            {days.map((d, index) => (
              <StyledTab
                value={index}
                currentDayIndex={currentDayIndex}
                component={Link}
                to={`/scheduletron/viewer/${weekId}/${index}`}
                label={
                  <p>
                    <span className="weekday">{d.weekday}</span>
                    {d.month}/{d.day}
                  </p>
                }
              />
            ))}
          </StyledTabs>

          <MainContent day={currentDay} isDesktop={isDesktop} />
        </StyledPaper>
      ))
    );
  }
  return null;
};

export default TabsContainer;
