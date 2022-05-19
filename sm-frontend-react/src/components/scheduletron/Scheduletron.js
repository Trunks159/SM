import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Route, Switch, withRouter } from "react-router-dom";
import Nav from "./nav/Nav";
import Home from "./home/Home";
import Scheduler from "./scheduler/Scheduler";
import WeekBar from "./WeekBar";

const styles = () => ({
  main: {
    display: "flex",
    flexGrow: 1,
    maxWidth: 1400,
    marginLeft: "auto",
    marginRight: "auto",
    position: "relative",
  },
});

class Scheduletron extends Component {
  state = {
    schedules: null,
    selected: null,
    day: null,
    isDesktop: false,
    marginLeft: 100,
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
    const isDesktop = window.innerWidth > 600;
    this.setState({ isDesktop: isDesktop });
  };

  setScheduleSet = (scheduleSet) => {
    /* Used by DayBtn and of course ComponentDidMount
        kinda self explanatory*/
    console.log("i run: ", scheduleSet);
    const schedules = scheduleSet.map(({ schedule, timeFrame }) => ({
      id: schedule.id,
      week: schedule.schedule,
      timeFrame: timeFrame,
      staffing: schedule.staffing,
    }));
    this.setState({ schedules: schedules });
  };

  handleSelect = (newlySelected) => {
    console.log("Duh week: ", newlySelected);
    if (this.state.selected === newlySelected) {
      this.setState({ selected: null });
    } else {
      this.setState({ selected: newlySelected });
    }
    this.setState({ selected: this.state.selected === newlySelected ? null: newlySelected});
  };

  setDay = (id) => {
    const day = this.state.selected.week.find((d) => d.id === id);
    this.setState({ day: day });
  };

  adjustMarginLeft = (marginLeft) => {
    this.state.marginLeft !== marginLeft &&
      this.setState({ marginLeft: marginLeft });
  };

  render() {
    const { classes } = this.props;
    const { schedules, selected, day, isDesktop, marginLeft } = this.state;
    console.log('Selected thing: ', selected);
    return schedules ? (
      <div className={classes.main}>
        <Nav
          adjustMarginLeft={this.adjustMarginLeft}
          selected={selected}
          setDay={this.setDay}
          dayId={
            selected
              ? selected.week[0].id
              : schedules.find(({ timeFrame }) => timeFrame === "this week")
                  .week[0].id
          }
        />
        {/*
        <Nav
          path={path}
          dayId={
            this.state.selected
              ? this.state.selected.week[0].id
              : this.state.schedules.find(
                  ({ timeFrame }) => timeFrame === "this week"
                ).week[0].id
          }
        />
          */}
        {/*this.state.selected && this.state.isDesktop ? (
          <WeekBar week={this.state.selected.week} setDay={this.setDay} />
        ) : null*/}
        <div style={{ display: "flex", flex: 1, marginLeft: marginLeft }}>
          <Switch>
            <Route exact path={"/scheduletron"}>
              <Home
                handleSelect={this.handleSelect}
                selected={this.state.selected}
                schedules={this.state.schedules}
              />
            </Route>
            <Route
              path={"/scheduletron/:day"}
              render={({ match }) => {
                const day = selected
                  ? selected.week.find(
                      ({ id }) => id === parseInt(match.params.day)
                    )
                  : null;
                return (
                  <Scheduler
                    dayId={match.params.day}
                    marginLeft={selected && isDesktop ? 230 : 100}
                    day={day}
                    handleSelect={this.handleSelect}
                    setScheduleSet={this.setScheduleSet}
                  />
                );
              }}
            />
          </Switch>
        </div>
      </div>
    ) : null;
  }
}

export default withStyles(styles)(Scheduletron);
