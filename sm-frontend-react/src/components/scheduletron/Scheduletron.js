import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Route, Switch, withRouter } from "react-router-dom";
import Nav from "./Nav";
import Home from "./home/Home";
import Scheduler from "./scheduler/Scheduler";
import WeekBar from "./WeekBar";
import Nav2 from "./Nav2";

const styles = () => ({
  main: {
    display: "grid",
    gridTemplateColumns: "1fr",
  },
});

class Scheduletron extends Component {
  state = {
    schedules: null,
    selected: null,
    day: null,
    isDesktop: false,
  };

  componentDidMount = () => {
    /*This would request for today but not yet
      it initializes the schedule set which is an array of
      5 or so weekSchedules
    */

    if (this.state.schedules === null) {
      fetch(`/get_week_schedules/${9}-${13}-${2021}`)
        .then((response) => response.json())
        .then((scheduleSet) => {
          this.setScheduleSet(scheduleSet);
        });
    }
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updatePredicate);
  };

  updatePredicate = () => {
    this.setState({ isDesktop: window.innerWidth > 600 });
  };

  setScheduleSet = (scheduleSet) => {
    /* Used by DayBtn and of course ComponentDidMount
        kinda self explanatory*/
    const schedules = scheduleSet.map(({ schedule, timeFrame }) => ({
      id: schedule.id,
      week: schedule.schedule,
      timeFrame: timeFrame,
      staffing: schedule.staffing,
    }));
    this.setState({ schedules: schedules });
  };

  handleSelect = (week) => {
    console.log("Duh week: ", week);
    if (this.state.selected === week) {
      this.setState({ selected: null });
    } else {
      this.setState({ selected: week });
    }
  };

  setDay = (id) => {
    const day = this.state.selected.week.find((d) => d.id === id);
    this.setState({ day: day });
  };

  render() {
    const { classes, match } = this.props;
    let { path } = match;

    return this.state.schedules ? (
      <div className={classes.main}>
        <Nav
          path={path}
          dayId={
            this.state.selected
              ? this.state.selected[0].id
              : this.state.schedules.find(
                  ({ timeFrame }) => timeFrame === "this week"
                ).week[0].id
          }
        />

        {this.state.selected && this.state.isDesktop ? (
          <WeekBar
            week={this.state.selected}
            path={path}
            setDay={this.setDay}
          />
        ) : null}
        <Switch>
          <Route exact path={"/scheduletron"}>
            <Home
              handleSelect={this.handleSelect}
              selected={this.state.selected}
              schedules={this.state.schedules}
              marginLeft={
                this.state.selected && this.state.isDesktop ? 230 : 100
              }
            />
          </Route>
          <Route
            path={"/scheduletron/:day"}
            render={({ match }) => {
              const day = this.state.selected
                ? this.state.selected.week.find(
                    ({ id }) => id === parseInt(match.params.day)
                  )
                : null;
              return (
                <Scheduler
                  day={this.state.day}
                  handleSelect={this.handleSelect}
                  setScheduleSet={this.setScheduleSet}
                />
              );
            }}
          />
        </Switch>
      </div>
    ) : null;
  }
}

export default withStyles(styles)(withRouter(Scheduletron));
