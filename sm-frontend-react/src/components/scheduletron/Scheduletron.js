import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Route, Switch, withRouter } from "react-router-dom";
import SideNav from "./nav/SideNav";
import Home from "./home/Home";
import WeekTabs from "./weektabs/WeekTabs";

const styles = () => ({
  main: {
    display: "grid",
    gridTemplateColumns: "70px 1fr",
    flexGrow: 1,
    marginLeft: "auto",
    marginRight: "auto",
    position: "relative",
    justifyItems: "center",
  },
});

class Scheduletron extends Component {
  state = {
    schedules: null,
    selected: null,
    day: null,
    isDesktop: false,
    screenWidth: 0,
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
    this.setState({ isDesktop: isDesktop, screenWidth: window.innerWidth });
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

  handleSelect = (newlySelected) => {
    console.log("Duh week: ", newlySelected);
    this.setState({ selected: newlySelected });
  };

  setDay = (id) => {
    const day = this.state.selected.week.find((d) => d.id === id);
    this.setState({ day: day });
  };

  render() {
    const { classes } = this.props;
    const { schedules, selected, screenWidth } = this.state;
    console.log("Selected thing: ", selected);
    return schedules ? (
      <div className={classes.main}>
        <SideNav
          selected={selected}
          setDay={this.setDay}
          dayId={
            selected
              ? selected.week[0].id
              : schedules.find(({ timeFrame }) => timeFrame === "this week")
                  .week[0].id
          }
        />

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
              console.log("Dude: ", Boolean(selected));
              const day = selected
                ? selected.week.find(
                    ({ id }) => id === parseInt(match.params.day)
                  )
                : null;
              console.log("The day i found : ", day);
              return (
                <WeekTabs
                  dayId={match.params.day}
                  day={day}
                  days={selected && selected.week}
                  handleSelect={this.handleSelect}
                  setScheduleSet={this.setScheduleSet}
                  screenWidth={screenWidth}
                />
              );
            }}
          />
        </Switch>
      </div>
    ) : null;
  }
}

export default withStyles(styles)(Scheduletron);

/*      
       


         */
