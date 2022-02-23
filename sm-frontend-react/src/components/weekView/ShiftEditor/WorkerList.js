import React, { Component } from "react";
import ProfileTag from "./ProfileTag.js";
import { withStyles } from "@material-ui/styles";
import AddWorkers from "./AddWorkers.js";
import {
  timesToValues,
  valueToDt,
  dtToValue,
} from "../../mySlider/TimeFunctions";
import Actions from './Actions.js'

/*So when thius component loads it takes the wbs in the day
loops through those and puts them in workers and removes them from
workers 2 */

const styles = () => ({
  main: {
    position: "relative",
    background: "#D2DDDA",
    borderRadius: 7,
    height: "100%",
    minHeight: 100,
    minWidth: 100,
    overflowY: "auto",
  },
  checkbox: {
    color: "#FFB932",
    "&.Mui-checked": {
      color: "#FFB932",
    },
  },
  textDiv: {
    position: "relative",
    margin: 15,
    "& p": {
      whiteSpace: "nowrap",
      display: "inline-block",
    },
  },
  list: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    margin: 10,
    gap: "10px",
  },

});


class WorkerList extends Component {
  state = {
    addWorkers: false,
    scheduled: this.props.scheduled || [],
    notScheduled: this.props.notScheduled || [],
  };

  handleSlider = (e, newValue, id) => {
    const { scheduled } = this.state;
    const worker = scheduled.find((w) => w.userId === id);
    if (worker) {
      const index = scheduled.indexOf(worker);
      worker.startTime = newValue[0];
      worker.endTime = newValue[1];
      scheduled.splice(index, 1, worker);
      this.setState({ scheduled: scheduled });
      console.log("WOrkers: ", scheduled);
    } else {
      console.log("Couldnt find them");
    }
  };

  submitWorkers = (submittedWorkers) => {
    /*This function is called from the AddWorkers Component */
    let { scheduled, notScheduled } = this.state;
    submittedWorkers.map((worker) => {
      let found = notScheduled.find((w) => w.id === worker.id);
      if (found) {
        let index = notScheduled.indexOf(found);
        /*Set up the default start and end time of each worker*/
        found = { firstName : found.firstName, startTime: 0, endTime: 50, position: found.position, userId : found.id, dayId : this.props.day.id };
        console.log('Found: ', found);
        scheduled.push(found);
        notScheduled.splice(index, 1);
      } else {
        console.log("Not Found...");
      }
    });
    this.setState({ scheduled: scheduled, notScheduled: notScheduled });
  };

  handleClose = (id) => {
    const { scheduled, notScheduled } = this.state;
    console.log("ID", id);
    let found = scheduled.find((w) => w.id === id);
    if (found) {
      const index = scheduled.indexOf(found);
      scheduled.splice(index, 1);
      notScheduled.push(found);
    } else {
      console.log("IDK Man i cant find it: ", scheduled);
    }
    this.setState({ scheduled: scheduled, notScheduled: notScheduled });
  };

  handleAdd = () => {
    this.setState({ addWorkers: !this.state.addWorkers });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { scheduled } = this.state;
    const { postReq, day } = this.props;
    if (scheduled) {
      scheduled = scheduled.map((worker) => {
        console.log('The worker: ', worker);
        const convertTime = (time) => {
          const x = valueToDt(time);
          return x.toTimeString().slice(0, 5);
        };
        return {
          user_id: worker.userId,
          start_time: convertTime(worker.startTime),
          end_time: convertTime(worker.endTime),
        };
      });
      console.log('What is sent: ', scheduled);
      postReq(`/edit_schedule/${day.id}`, scheduled);
    }
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps != this.props) {
      console.log("Not scheduled: ", this.props.notScheduled);
      this.setState({
        notScheduled: this.props.notScheduled,
      });
    }
  };

  componentDidMount = () => {
   
    fetch(`/get_schedule/${this.props.day.id}`)
      .then((response) => response.json())
      .then(({ scheduled, notScheduled }) => {
        let newScheduled = [];
        for (let wb of scheduled) {
          newScheduled.push({
            ...wb,
            startTime: dtToValue(
              new Date("January 1, 1980 " + wb.startTime + ":00")
            ),
            endTime: dtToValue(
              new Date("January 1, 1980 " + wb.endTime + ":00")
            ),
          });
        }
        console.log('sh: ', scheduled);
        
        this.setState({ scheduled: newScheduled, notScheduled: notScheduled });
      });
  };

  render() {
    const { classes } = this.props;
    const { scheduled, notScheduled } = this.state;
    
    return this.state.notScheduled ? (
      <div className={classes.main}>
        <div className={classes.list}>
          {scheduled.map(({ firstName, position, startTime, endTime, userId }) => {
            return (
              <ProfileTag
                weekday = {this.props.day.weekday}
                key={userId}
                id={userId}
                firstName={firstName}
                position={position}
                startTime={startTime}
                endTime={endTime}
                handleClose={this.handleClose}
                handleSlider={this.handleSlider}
              />
            );
          })}
        </div>

        {this.state.addWorkers ? (
          <AddWorkers
            notScheduled={notScheduled}
            closeWindow={this.handleAdd}
            submitWorkers={this.submitWorkers}
          />
        ) : (
          <Actions handleAdd = {this.handleAdd} handleSubmit = {this.handleSubmit}/>
        )}
      </div>
    ) :(
      <p>
        Hold up im loading
      </p>
    )
  }
}

export default withStyles(styles)(WorkerList);
