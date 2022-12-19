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
  const [currentDay, setCurrentDay] = useState(null);

  useEffect(() => {
    const day = selectedWeek.week.find((d) => d.id === props.dayId);

    if (!Boolean(day)) {
      fetch(`/get_week_schedule?week-id=${props.weekId}`)
        .then((response) => response.json())
        .then((response) => {
          if (response) {
            dispatch(updateSelectedWeek(response));
          } else {
            setRedirect(<Redirect to="/scheduletron" />);
          }
        });
    } else if (day !== currentDay) {
      dispatch(updateCurrentDayId(day.id));
      setCurrentDay(day);
    }
  }, [selectedWeek, props.weekId, props.dayId]);

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
