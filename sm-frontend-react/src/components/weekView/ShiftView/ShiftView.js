import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { Redirect } from "react-router";
import Header from "./Header";
import WorkerList from "./WorkerList";


const styles = () => ({
  main: {
    display :'flex',
    flexDirection : 'column',
    width : '100%',
    minWidth :100,
    maxheight : '100%',
  },
});

class ShiftView extends Component {
  state = {
    day: null,
    redirect: null,
    shiftView :false, 
  };

  setDay = ()=>{
    const { date, getReq } = this.props;
    const day = getReq(`/get_day/${date}`);
    day.then((data) =>
      data.json().then((day) => {
        if (day) {
          this.setState({ day: day });
        } else {
          this.setState({ redirect: <Redirect to="/" /> });
        }
      })
    );
  }


  componentDidMount = () => {
    this.setDay();
  };
  render() {
    const { classes, setupNavBar, postReq, date, users } = this.props;
    return (
      this.state.redirect ||
      (this.state.day ? (
        <div className={classes.main}>
          <Header
            date={`${this.state.day.month}/${
              this.state.day.day
            }/${this.state.day.year.toString().substring(2, 4)}`}
            projectedSales={`$${this.state.day.projected_sales}`}
            weekday={this.state.day.weekday}
            weekSchedule = 'Week Schedule (8/17/21 - 8/24/21)'
            shiftView = {this.state.shiftView}
          />
          <WorkerList
            postReq = {postReq}
            dayId = {this.state.day.id}
            users = {users}
          />
        </div>
      ) : null)
    );
  }
}

export default withStyles(styles)(ShiftView);
