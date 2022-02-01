import React, { Component } from "react";
import ProfileTag from "./ProfileTag.js";
import { withStyles } from "@material-ui/styles";
import { Checkbox, Divider } from "@material-ui/core";
import { ReactComponent as AddWorkersIcon } from "../../../assets/images/Add Workers Icon.svg";
import { ReactComponent as SubmitIcon } from "../../../assets/images/Submit Icon.svg";
import { ReactComponent as ShiftStatsIcon2 } from "../../../assets/images/Shift Stats Icon Alt 2.svg";
import { Button } from "@material-ui/core";
import AddWorkers from "./AddWorkers.js";
import { timesToValues, valueToDt } from "../../mySlider/TimeFunctions";

const styles = () => ({
  main: {
    position: "relative",
    background: "#D8F4EE",
    borderRadius: 7,
    margin: 10,
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
  actionsDiv: {
    display: "flex",
    background: "rgba(50, 143, 131, .78)",
    gap: "0px",
    margin: 10,
    marginBottom: 10,
    position: "fixed",
    bottom: 0,
    right: 0,
    borderRadius: "7px 0px 7px 0px",
    maxWidth: 250,
    justifyContent: "center",
    "@media(min-width: 500px)": {
      position: "absolute",
      margin: 0,
    },
  },
  actionBtn: {
    margin: 0,
    display: "flex",
    maxWidth: "100%",
    textTransform: "none",
    flexDirection: "column",
    "& p": {
      margin: 0,
      fontSize: 10,
      fontWeight: 500,
    },
  },
});

class WorkerList extends Component {
  state = {
    addWorkers: false,
    workers: [],
    workers2: [
      {
        firstName: "Charles",
        position: "manager",
        available: true,
        id: 1,
        startTime: 0,
        endTime: 50,
      },
      {
        firstName: "Nick",
        position: "crew",
        available: true,
        id: 2,
        startTime: 0,
        endTime: 50,
      },
      {
        firstName: "Phonsi",
        position: "crew",
        available: true,
        id: 3,
        startTime: 0,
        endTime: 50,
      },
      {
        firstName: "Quack",
        position: "crew",
        available: false,
        id: 4,
        startTime: 0,
        endTime: 50,
      },
      {
        firstName: "Snap",
        position: "crew",
        available: true,
        id: 5,
        startTime: 0,
        endTime: 50,
      },
      {
        firstName: "Pop",
        position: "manager",
        available: true,
        id: 6,
        startTime: 0,
        endTime: 50,
      },
      {
        firstName: "Jimmy",
        position: "manager",
        available: true,
        id: 7,
        startTime: 0,
        endTime: 50,
      },
      {
        firstName: "John",
        position: "manager",
        available: true,
        id: 8,
        startTime: 0,
        endTime: 50,
      },
    ],
  };

  handleSlider = (e, newValue, id) =>{
    const {workers} = this.state;
    const worker = workers.find((w)=>w.id === id)
    if(worker){
      const index = workers.indexOf(worker);
      worker.startTime = newValue[0];
      worker.endTime = newValue[1];
      workers.splice(index, 1, worker);
      this.setState({workers : workers});
      console.log('WOrkers: ', workers);
    }
    else{
      console.log('Couldnt find them');
    }
  }

  submitWorkers = (submittedWorkers) => {
    let { workers, workers2 } = this.state;
    submittedWorkers.map((worker) => {
      let found = workers2.find((w) => w.id === worker.id);
      if (found) {
        workers.push(found);
        let index = workers2.indexOf(found);
        workers2.splice(index, 1);
      } else {
        console.log("Not Found...");
      }
    });
    this.setState({ workers: workers, workers2: workers2 });
  };

  handleClose = (id) => {
    const { workers, workers2 } = this.state;
    console.log("ID", id);
    let found = workers.find((w) => w.id === id);
    if (found) {
      const index = workers.indexOf(found);
      workers.splice(index, 1);
      workers2.push(found);
    } else {
      console.log("IDK Man i cant find it: ", workers);
    }
    this.setState({ workers: workers, workers2: workers2 });
  };

  handleAdd = () => {
    this.setState({ addWorkers: !this.state.addWorkers });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { workers } = this.state;
    const { postReq } = this.props;
    if (workers) {
      workers = workers.map((worker) => {
        const convertTime = (time) =>{
          const x = valueToDt(time);
          return x.toTimeString().slice(0, 5);
        };
        return {
          id : worker.id,
          startTime: convertTime(worker.startTime),
          endTime : convertTime(worker.endTime),
        };
      });
      postReq("/edit_schedule", {
        workers : workers,
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { workers, workers2 } = this.state;

    const actions = [
      {
        name: "Add",
        icon: <AddWorkersIcon />,
        color: "#54F2D1",
        handle: this.handleAdd,
      },
      {
        name: "Stats",
        icon: <ShiftStatsIcon2 />,
        color: "#D8F4EE",
        handle: () => console.log("Shift Stats"),
      },
      {
        name: "Submit",
        icon: <SubmitIcon />,
        color: "#FFB932",
        handle: this.handleSubmit,
      },
    ];

    return (
      <div className={classes.main}>
        <div className={classes.textDiv}>
          <p>Sort By:</p>
          <p style={{ marginLeft: 10 }}>A-Z</p>
          <Checkbox className={classes.checkbox} />
          <p>Time</p>
          <Checkbox className={classes.checkbox} />

          <Divider />
        </div>
        <div className={classes.list}>
          {workers.map(({ firstName, position, startTime, endTime, id }) => {
            return (
              <ProfileTag
                key = {id}
                id = {id}
                firstName={firstName}
                position={position}
                startTime={startTime}
                endTime={endTime}
                handleClose={this.handleClose}
                handleSlider = {this.handleSlider}
              />
            );
          })}
        </div>

        {this.state.addWorkers ? (
          <AddWorkers
            workers={workers2}
            closeWindow={this.handleAdd}
            submitWorkers={this.submitWorkers}
          />
        ) : (
          <div className={classes.actionsDiv}>
            {actions.map(({ name, icon, color, handle }) => (
              <Button onClick={handle}>
                <div className={classes.actionBtn}>
                  {icon}
                  <p style={{ color: color }}>{name}</p>
                </div>
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(WorkerList);
