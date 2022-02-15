import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { Redirect } from "react-router";
import Header from "./Header";
import WorkerList from "./WorkerList";
import { dtToValue } from "../../mySlider/TimeFunctions";

const styles = () => ({
  main: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minWidth: 100,
    maxheight: "100%",
  },
});

class ShiftView extends Component {
  state = {
    day: null,
    redirect: null,
    shiftView: false,
    users: this.props.users.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
      position: user.position,
      /*
       this is where the program should check and see if the user is available
       we'll get that logic in here later
     */
    })),
  };

  componentDidMount = () => {
    fetch(`/get_day/${this.props.date}`)
      .then((response) => response.json())
      .then((day) => {
        this.setState({ day: day });
      });
  };
  
  render() {
    const { classes, postReq } = this.props;
    
    if (this.state.day) {
      const { day } = this.state;
      return (
        <div className={classes.main}>
          <Header
            date={`${day.month}/${day.day}/${day.year
              .toString()
              .substring(2, 4)}`}
            projectedSales={`$${day.projectedSales}`}
            weekday={day.weekday}
            weekSchedule="Week Schedule (8/17/21 - 8/24/21)"
            shiftView={this.state.shiftView}
          />
          <WorkerList
            postReq={postReq}
            day={day}
            users = {this.props.users}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default withStyles(styles)(ShiftView);
