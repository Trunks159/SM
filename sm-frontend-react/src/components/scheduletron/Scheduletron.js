import React, { Component } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import SideNav from "./nav/SideNav";
import Home from "./home/Home";
import WeekTabs from "./weektabs/WeekTabs";
import "./scheduletron.css";

const withLocation = (WhateverComponent) => {
  return (props) => <WhateverComponent location={useLocation()} {...props} />;
};

class Scheduletron extends Component {
  state = {
    weeks: null,
    isDesktop: false,
    screenWidth: 0,
    selectedWeek: null,
    redirect: null,
  };

  fetchWeekSchedule = (date) => {
    fetch(`/get_week_schedule?date=${date}`)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          console.log("Respondse:", response);
          this.setState({
            selectedWeek: response,
            redirect: (
              <Redirect to={`/scheduletron/viewer/${response.id}/${0}`} />
            ),
          });
        } else {
          this.setState({ redirect: <Redirect to={"/scheduletron"} /> });
        }
      });
  };

  setSelectedWeek = (week) => this.setState({ selectedWeek: week });

  componentDidMount = () => {
    window.addEventListener("resize", this.updatePredicate);
    this.updatePredicate();
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updatePredicate);
  };

  updatePredicate = () =>
    this.setState({
      isDesktop: window.innerWidth > 600,
      screenWidth: window.innerWidth,
    });

  render() {
    const { notifyUser, location } = this.props;
    const qParams = new URLSearchParams(location.search);
    const date = qParams.get("date");
    if (date) {
      this.fetchWeekSchedule("9-13-2021");
    }
    const { screenWidth, selectedWeek, weeks, redirect } = this.state;
    return (
      <div className="scheduletron">
        {redirect}
        <SideNav selectedWeek={selectedWeek} />

        <Switch>
          <Route exact path={"/scheduletron"}>
            <Home
              setSelectedWeek={this.setSelectedWeek}
              selectedWeek={selectedWeek}
              screenWidth={screenWidth}
            />
          </Route>

          <Route
            path={"/scheduletron/viewer/:weekId/:dayIndex"}
            render={({ match }) => {
              return (
                <WeekTabs
                  match={match}
                  weekId={parseInt(match.params.weekId)}
                  days={selectedWeek && selectedWeek.week}
                  screenWidth={screenWidth}
                  setSelectedWeek={this.setSelectedWeek}
                  dayIndex={parseInt(match.params.dayIndex)}
                  weekSchedule={selectedWeek}
                />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default withLocation(Scheduletron);
