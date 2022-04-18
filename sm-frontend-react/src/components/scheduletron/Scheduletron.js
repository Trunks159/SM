import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import Scheduler from "./scheduler/Scheduler";
import WeekBar from "./WeekBar";

const styles = () => ({
  main: {
    height: "100%",
    display: "flex",
  },
});

class Scheduletron extends Component {
  state = {
    schedules: null,
    selected: null,
  };

  componentDidMount = () => {
    /*This would request for today but not yet */
    fetch(`/get_week_schedules/${9}-${13}-${2021}`)
      .then((response) => response.json())
      .then((schedules) => {
        schedules = schedules.map(({ schedule, timeFrame }) => ({
          id: schedule.id,
          week: schedule.schedule,
          timeFrame: timeFrame,
          staffing: schedule.staffing,
        }));
        this.setState({ schedules: schedules });
      });
  };

  handleSelect = (week) => {
    console.log("the selected", week);
    if (this.state.selected === week) {
      this.setState({ selected: null });
    } else {
      this.setState({ selected: week });
    }
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
              ? this.state.selected.week[0].id
              : this.state.schedules.find(
                  ({ timeFrame }) => timeFrame === "this week"
                ).week[0].id
          }
        />
        {this.state.selected ? (
          <WeekBar week={this.state.selected.week} />
        ) : null}

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
              const day = this.state.selected
                ? this.state.selected.week.find(
                    ({ id }) => id === parseInt(match.params.day)
                  )
                : null;
              console.log("Ad day is passed ", day);
              return <Scheduler day={day} handleSelect={this.handleSelect} />;
            }}
          />
        </Switch>
      </div>
    ) : null;
  }
}

export default withStyles(styles)(withRouter(Scheduletron));
