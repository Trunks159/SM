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

  //STATE
  const [redirect, setRedirect] = useState(null);

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

  useEffect(() => {
    if (props.weekId !== selectedWeek.id) {
      fetchWeekSchedule(props.weekId);
    }

    if (props.dayId && (props.dayId !== currentSchedule.dayId)) {
      dispatch(updateCurrentDayId(props.dayId));
    }
  });

  return (
    <StyledPaper>
      Yo{props.dayId}
      Excepteur enim dolore sit ea non non ad mollit. Do esse incididunt
      cupidatat cupidatat anim consectetur anim ex minim. Exercitation voluptate
      non qui esse mollit excepteur excepteur quis ea officia sint enim
      consectetur. Ad in in ut adipisicing mollit sit esse aute irure in dolor
      ullamco. In ad cupidatat quis velit in velit qui Lorem. Eu est consequat
      occaecat occaecat nostrud consequat aliquip ullamco sunt nostrud.
      Adipisicing dolore nisi est excepteur ut elit.
    </StyledPaper>
  );
};

export default TabsContainer;
