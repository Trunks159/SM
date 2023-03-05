import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import WeekTabs from "./weektabs/WeekTabs";
import "./scheduletron.css";

function Scheduletron() {
  return (
    <div className="scheduletron">
      <Switch>
        <Route exact path={"/scheduletron"}>
          <Home />
        </Route>

        <Route
          path={"/scheduletron/viewer/:weekId?/:dayId?"}
          render={({ match }) => {
            return (
              <WeekTabs
                weekId={parseInt(match.params.weekId)}
                dayId={parseInt(match.params.dayId)}
              />
            );
          }}
        />
      </Switch>
    </div>
  );
}

export default Scheduletron;
