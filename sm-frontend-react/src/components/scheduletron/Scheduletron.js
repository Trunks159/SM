import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SideNav from "./nav/SideNav";
import Home from "./home/Home";
import WeekTabs from "./weektabs/WeekTabs";
import "./scheduletron.css";

class Scheduletron extends Component {
  state = {
    weeks: null,
    isDesktop: false,
    screenWidth: 0,
    selectedWeek: null,
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
    const { classes } = this.props;
    const { screenWidth, selectedWeek, weeks } = this.state;
    const isDesktop = screenWidth >= 600;
    return (
      <div className="scheduletron">
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
            path={"/scheduletron/:weekId/:dayIndex?"}
            render={({ match }) => {
              /* const day = selected
                  ? selected.week.find(
                      ({ id }) => id === parseInt(match.params.day)
                    )
                  : null;*/

              return match.params.dayIndex ? (
                <WeekTabs
                  weekId={match.params.weekId}
                  days={selectedWeek && selectedWeek.week}
                  screenWidth={screenWidth}
                  setSelectedWeek={this.setSelectedWeek}
                  dayIndex={parseInt(match.params.dayIndex)}
                  weeks={weeks}
                />
              ) : (
                <Redirect to={`${match.url}/0`} />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default Scheduletron;
