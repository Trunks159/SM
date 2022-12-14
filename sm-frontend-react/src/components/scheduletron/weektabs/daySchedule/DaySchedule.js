import React, { useState, useEffect } from "react";
import "./daySchedule.css";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { StyledPaper } from "../StyledComponents";

//ACTIONS
const initializeSchedule = ({ scheduled, notScheduled, timeRange }) => {
  return {
    type: "INITIALIZE_SCHEDULE",
    payLoad: { scheduled, notScheduled, timeRange },
  };
};

function DaySchedule({ currentDay }) {
  const [redirect, setRedirect] = useState(null);
  //for now this is the timerange but it will be changed
  // to something more dynamic
  const currentSchedule = useSelector((state) => state.currentSchedule);
  const dispatch = useDispatch();
  function getTimeRange(date) {
    return [
      moment(date).clone().set({ h: 0, m: 0 }).format("YYYY-MM-DD hh:mm:ss a"),
      moment(date)
        .clone()
        .set({ h: 0, m: 0 })
        .add(1, "days")
        .format("YYYY-MM-DD hh:mm:ss a"),
    ];
  }

  const setUpState = (currentDay) => {
    fetch(`/get_schedule/${currentDay.id}`)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          dispatch(
            initializeSchedule({
              scheduled: response.scheduled,
              notScheduled: response.notScheduled,
              timerange: getTimeRange(currentDay.date),
            })
          );
        } else {
          setRedirect(<Redirect to={"/scheduletron"} />);
        }
      });
  };
  /*
  useEffect(() => {
    setUpState(currentDay);
  }, [currentDay]);
*/
  return (
    <StyledPaper key={currentDay.id} elevation={1}>
      {redirect}
    </StyledPaper>
  );
}

export default DaySchedule;
