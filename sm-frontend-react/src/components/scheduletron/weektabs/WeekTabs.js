import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import DaySchedule from "./daySchedule/DaySchedule";
import { useSelector, useDispatch } from "react-redux";
import { StyledPaper, StyledTab, StyledTabs } from "./StyledComponents";
import moment from "moment";

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
  //STATE
  const [redirect, setRedirect] = useState(null);

  //SIDE EFFECTS
  function updateState() {
    //fetches a weekSchedule and updates week and day
    fetch(
      isNaN(props.weekId)
        ? //if nothing is sent for weekid inquire about THIS week's info
          `/get_week_schedule?date=${"9-13-2021"}`
        : `/get_week_schedule?week-id=${props.weekId}`
    )
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          dispatch(updateSelectedWeek(response));
          //if day works it updates day in state
          //otherwise it assumes monday is the correct
          //day and it uses that id
          validateDayId(response, props.dayId);
        } else {
          setRedirect(<Redirect to="/scheduletron" />);
        }
      });
  }

  function validateDayId(week, dayId) {
    const day = week.week.find(({ id }) => id === dayId);
    if (day) {
      dispatch(updateCurrentDayId(day.id));
    } else {
      setRedirect(
        <Redirect to={`/scheduletron/viewer/${week.id}/${week.week[0].id}`} />
      );
    }
  }

  useEffect(() => {
    if (props.weekId !== selectedWeek.id) {
      updateState(props.weekId, props.dayId);
    } else if (props.dayId !== currentSchedule.dayId) {
      validateDayId(selectedWeek, props.dayId);
    }
  }, [props.weekId, props.dayId]);
  ////////////////////

  const currentDayExists = selectedWeek.week.find(
    (item) => item.id === currentSchedule.dayId
  );

  return (
    <StyledPaper>
      {redirect}
      {currentDayExists && (
        <>
          <StyledTabs variant="scrollable" value={currentSchedule.dayId}>
            {/*You might want to separate this and define the Tabs above 
              but DONOT. For some reason the scrollbuttons dont work or the indicator*/}
            {selectedWeek.week.map(({ id, date }) => {
              const theDate = moment(date);
              return (
              <StyledTab
                key={id}
                value={id}
                component={Link}
                to={`/scheduletron/viewer/${props.weekId}/${id}`}
                label={
                  <p>
                    <span className="weekday">{theDate.format('dddd')},</span>
                    {theDate.format('M/D')}
                  </p>
                }
              />
            )})}
          </StyledTabs>
          <DaySchedule />
        </>
      )}
    </StyledPaper>
  );
};

export default TabsContainer;
