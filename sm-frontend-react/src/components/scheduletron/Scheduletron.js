import React, { useState } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import SideNav from "./nav/SideNav";
import Home from "./home/Home";
import WeekTabs from "./weektabs/WeekTabs";
import "./scheduletron.css";
import { useSelector, useDispatch } from "react-redux";

//ACTIONS
function updateSelectedWeek(newWeek) {
  return { type: "UPDATE_SELECTED_WEEK", payLoad: newWeek };
}

function Scheduletron() {
  const location = useLocation();
  const qParams = new URLSearchParams(location.search);
  const date = qParams.get("date");
  const selectedWeek = useSelector((state) => state.selectedWeek);
  const screenWidth = useSelector((state) => state.screenWidth);
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(null);

  function fetchWeekSchedule(date) {
    fetch(`/get_week_schedule?date=${date}`)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          dispatch(updateSelectedWeek(response));
          setRedirect(
            <Redirect to={`/scheduletron/viewer/${response.id}/${0}`} />
          );
        } else {
          setRedirect({ redirect: <Redirect to={"/scheduletron"} /> });
        }
      });
  }

  date && fetchWeekSchedule("9-13-2021");

  return (
    <div className="scheduletron">
      {redirect}
      <SideNav selectedWeek={selectedWeek} />

      <Switch>
        <Route exact path={"/scheduletron"}>
          <Home />
        </Route>

        <Route
          path={"/scheduletron/viewer/:weekId/:dayId"}
          render={({ match }) => {
            return (
              <WeekTabs
                match={match}
                weekId={parseInt(match.params.weekId)}
                dayId={parseInt(match.params.dayId)}
                weekSchedule={selectedWeek}
                screenWidth={screenWidth}
              />
            );
          }}
        />
      </Switch>
    </div>
  );
}

export default Scheduletron;
