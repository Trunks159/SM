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
  const [redirect, setRedirect] = useState(null);

  const isDesktop = screenWidth >= 600;

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

  function getCurrentDay(dayId, selectedWeek) {
    console.log("Dayid: ", dayId, "SelectedWeek: ", selectedWeek);
    if (selectedWeek.week.length > 0) {
      return (
        selectedWeek.week.find(({ id }) => id === dayId) ||
        setRedirect(
          <Redirect
            to={`/scheduletron/viewer/${selectedWeek.id}/${selectedWeek.week[0].id}`}
          />
        )
      );
    }
    return false;
  }

  useEffect(() => {
    if (selectedWeek.id !== props.weekId) {
      fetchWeekSchedule(props.weekId);
    }

    if (props.dayId !== currentSchedule.dayId && !isNaN(props.dayId)) {
      dispatch(updateCurrentDayId(props.dayId));
    }
  }, [props.weekId, props.dayId]);
  const currentDay = getCurrentDay(props.dayId, selectedWeek);
  console.log("Mommydarlin: ", currentDay);
  return (
    currentDay && (
      <StyledPaper>
        {redirect}
        <StyledTabs variant="scrollable" value={currentSchedule.dayId}>
          {/*You might want to separate this and define the Tabs above 
              but DONOT. For some reason the scrollbuttons dont work or the indicator*/}
          {selectedWeek.week.map(({ id, day, month, weekday }) => (
            <StyledTab
            key = {id}
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

        <DaySchedule day={currentDay} isDesktop={isDesktop} />
      </StyledPaper>
    )
  );
};

export default TabsContainer;
