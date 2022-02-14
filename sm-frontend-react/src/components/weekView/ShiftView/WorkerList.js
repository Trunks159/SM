import React, { Component } from "react";
import ProfileTag from "./ProfileTag.js";
import { withStyles } from "@material-ui/styles";
import { Checkbox, Divider } from "@material-ui/core";
import { ReactComponent as AddWorkersIcon } from "../../../assets/images/Add Workers Icon.svg";
import { ReactComponent as SubmitIcon } from "../../../assets/images/Submit Icon.svg";
import { ReactComponent as ShiftStatsIcon2 } from "../../../assets/images/Shift Stats Icon Alt 2.svg";
import { Button } from "@material-ui/core";
import AddWorkers from "./AddWorkers.js";
import { timesToValues, valueToDt, dtToValue } from "../../mySlider/TimeFunctions";

/*So when thius component loads it takes the wbs in the day
loops through those and puts them in workers and removes them from
workers 2 */

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

const divideWorkers = (day, users, setState ) => {
  /*So there are 2 lists of workers, ones that have been
  added to the schedule and the ones that are just users
  who may or may not be available */
  let scheduled = [];
  let notScheduled = users;
  if (day) {
    const { workblocks } = day;
    for (let wb of workblocks) {
      let worker = notScheduled.find((w) => (w.id = wb.userId));
      let index = notScheduled.indexOf(worker);
      notScheduled.splice(index, 1);
      scheduled.push({
        firstName: worker.firstName,
        id: wb.userId,
        startTime: dtToValue(
          new Date("January 1, 1980 " + wb.startTime + ":00")
        ),
        endTime: dtToValue(new Date("January 1, 1980 " + wb.endTime + ":00")),
        position: worker.position,
      });
    }
    setState({
      notScheduled: notScheduled,
      scheduled: scheduled,
    });
  }
};

class WorkerList extends Component {
  state = {
    addWorkers: false,
    scheduled : this.props.scheduled || [] ,
    notScheduled : this.props.notScheduled || [],
  };

  handleSlider = (e, newValue, id) => {
    const { scheduled } = this.state;
    const worker = scheduled.find((w) => w.id === id);
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
        found = { ...found, startTime: 0, endTime: 50 };
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
        const convertTime = (time) => {
          const x = valueToDt(time);
          return x.toTimeString().slice(0, 5);
        };
        return {
          id: worker.id,
          start_time: convertTime(worker.startTime),
          end_time: convertTime(worker.endTime),
        };
      });
      postReq(`/edit_schedule/${day.id}`, scheduled);
    }
  };

  componentDidUpdate = (prevProps)=>{
    if(prevProps != this.props){
      console.log('Not scheduled: ', this.props.notScheduled)
      this.setState({
        notScheduled : this.props.notScheduled
      });
    }
  }

  componentDidMount = ()=>{
    fetch(`get_schedule${this.props.day.id}`)
    .then((response)=> response.json())
    .then(({scheduled, notScheduled})=>{
      scheduled = scheduled.map((wb)=> ({
        ...wb, 
        wb.startTime : dtToValue(new Date("January 1, 1980 " + wb.startTime + ":00")),
        wb.endTime : dtToValue(new Date("January 1, 1980 " + wb.endTime + ":00"))
        }  ))
      this.setState({scheduled : scheduled, notScheduled: notScheduled});
    })
  }

  render() {
    const { classes } = this.props;
    const { scheduled, notScheduled } = this.state;
    console.log('Not Sce: ', scheduled)
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
          {scheduled.map(({ firstName, position, startTime, endTime, id }) => {
            return (
              <ProfileTag
                key={id}
                id={id}
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
