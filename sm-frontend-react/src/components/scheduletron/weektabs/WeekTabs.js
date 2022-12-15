import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import DaySchedule from "./daySchedule/DaySchedule";
import { useSelector, useDispatch } from "react-redux";
import { StyledPaper, StyledTab, StyledTabs } from "./StyledComponents";

//

//ACTIONS
function updateSelectedWeek(newWeek) {
  return { type: "UPDATE_SELECTED_WEEK", payLoad: newWeek };
}

function updateCurrentDayId(dayId) {
  return { type: "UPDATE_DAY_ID", payLoad: dayId };
}

const TabsContainer = (props) => {
  //This dayId is the source for all day changes

  const dispatch = useDispatch();

  //GLOBAL STATE
  const selectedWeek = useSelector((state) => state.selectedWeek);
  const currentSchedule = useSelector((state) => state.currentSchedule);
  const screenWidth = useSelector((state) => state.screenWidth);
  //STATE
  let [redirect, setRedirect] = useState(null);

  function fetchWeekSchedule(weekId) {
    fetch(`/get_week_schedule?week-id=${weekId}`)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          dispatch(updateSelectedWeek(response));
        } else {
          setRedirect(<Redirect to="/scheduletron" />);
        }
      });
  }

  function getCurrentDay(selectedWeek, redirect, dayId) {
    //If the dayid makes can be found in the week, all should go well
    //if not it will redirect using the dayid of the day at index[0]
    //in selected week
    if (selectedWeek.week.length > 0) {
      const currentDay = selectedWeek.week.find((d) => d.id === dayId);

      if (Boolean(currentDay) === false) {
        redirect =
          redirect ||
          setRedirect(
            <Redirect
              to={`/scheduletron/viewer/${selectedWeek.id}/${selectedWeek.week[0].id}`}
            />
          );
      }
      return currentDay;
    }
  }

  useEffect(() => {
    if (props.weekId !== selectedWeek.id) {
      fetchWeekSchedule(props.weekId);
    }

    if (props.dayId && props.dayId !== currentSchedule.dayId) {
      dispatch(updateCurrentDayId(props.dayId));
    }
  });

  const currentDay = getCurrentDay(
    selectedWeek,
    redirect,
    currentSchedule.dayId
  );

  return (
    <StyledPaper>
      {redirect}
      {currentDay && (
        <>
          <StyledTabs variant="scrollable" value={currentSchedule.dayId}>
            {/*You might want to separate this and define the Tabs above 
              but DONOT. For some reason the scrollbuttons dont work or the indicator*/}
            {selectedWeek.week.map(({ id, day, month, weekday }) => (
              <StyledTab
                key={id}
                value={id}
                currentDayId={currentSchedule.dayId}
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
