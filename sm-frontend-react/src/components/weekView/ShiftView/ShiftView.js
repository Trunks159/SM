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
  };

  setDay = () => {
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
  };

  setUpWorkersList = () => {
    let workers = [];
    let workers2 = this.props.users;
    if (this.state.day){
      const { workblocks } = this.state.day;
      
      for (let wb of workblocks) {
        let worker = workers2.find((w)=>w.id = wb.user_id)
        console.log('Found worker: ', workers2);
        let index = workers2.indexOf(worker);
        workers2.splice(index, 1)
        workers.push({
          userId: wb.user_id,
          startTime: dtToValue(
            new Date("January 1, 1980 " + wb.start_time + ":00")
          ),
          endTime: dtToValue(
            new Date("January 1, 1980 " + wb.end_time + ":00")
          ),
          position : worker.position,
        });
      
      }
      
    }
    return ({
      workers :workers,
      workers2 : workers2,
    })
  };

  loadUsers = () => {
    let { users } = this.props;
    users = users.map((user) => {
      return {
        firstName: user.first_name,
        lastName: user.last_name,
        id: user.id,
        position: user.position,
        /*
         this is where the program should check and see if the user is available
         we'll get that logic in here later
       */
        available: true,
      };
    });
    return users;
  };

  componentDidMount = () => {
    this.setDay();
  };
  render() {
    const { classes, postReq } = this.props;
    const {workers, workers2} = this.setUpWorkersList();
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
            weekSchedule="Week Schedule (8/17/21 - 8/24/21)"
            shiftView={this.state.shiftView}
          />
          <WorkerList
            postReq={postReq}
            day={this.state.day}
            users={this.loadUsers()}
            workers = {workers}
          />
        </div>
      ) : null)
    );
  }
}

export default withStyles(styles)(ShiftView);
