import React, { Component } from "react";
import Vizualizer from "./visualizer/Visualizer";
import Editor from "./editor/Editor";
import { timeToValue } from "../../TimeFunctions";
import "./maincontent.css";
import moment from "moment";
import Functions from "./functions/Functions";
import TheDrawer from "./drawer/TheDrawer";
import { Redirect } from "react-router-dom";
import { red } from "@material-ui/core/colors";

class MainContent extends Component {
  state = {
    allUsers: [],
    scheduled: [],
    notScheduled: [],
    currentFunction: null,
    redirect: null,
    timeslotsWidth : 0,
  };

  changeCurrentFunction = (e, newVal) => {
    this.setState({ currentFunction: newVal });
  };

  getAvailableUsers = () => {
    const { allUsers, scheduledBlocks } = this.state;
    const scheduledUsersIds = scheduledBlocks.map(({ user }) => user.id);

    return allUsers.filter(({ id }) => scheduledUsersIds.includes(id));
  };

  saveSchedule = ()=>{
    
  }

  removeFromSchedule = (userId) => {
    let { notScheduled, scheduled } = this.state;
    notScheduled.push(
      scheduled.splice(
        scheduled.indexOf(scheduled.find((wb) => wb.user.id === userId)),
        1
      )[0].user
    );
    this.setState({ notScheduled: notScheduled, scheduled: scheduled });
  };

  addToSchedule = (userId) => {
    let { notScheduled, scheduled } = this.state;
    const {day} = this.props
    const user = notScheduled.splice(
      notScheduled.indexOf(notScheduled.find((person) => person.id === userId)),
      1
    )[0];

    scheduled.push({
      user: user,
      startTime: moment(day.date).set('hour', 8),
      endTime: moment(day.date).set('hour' , 16),
      userId : user.id,
      dayId : day.id,
    });
    this.setState({ notScheduled: notScheduled, scheduled: scheduled });
  };

  handleSlider = (new_value, userId) => {
    let { scheduled } = this.state;
    let theIndex = null;
    let editedUser = scheduled.find((wb, index) => {
      if (wb.user.id === userId) {
        scheduled.splice(index, 1);
        theIndex = index;
        return true;
      }
    });
    editedUser = {
      ...editedUser,
      startTime: new_value[0],
      endTime: new_value[1],
    };
    scheduled.splice(theIndex, 0, editedUser);

    this.setState({ scheduled: scheduled });
  };

  componentDidMount = () => {
    this.setUpState();
  };

  timeToPix = (time, width = this.state.timeslotsWidth) => {
    const timerange = this.props.availableTimes.map((t) => moment(t));
    //Get from moment to a percentage, then multiply that by the width
    time = moment(time);
    const overflowLeft = time.diff(timerange[0], "hours", true) < 0;
    const overflowRight = time.diff(timerange[1], "hours", true) > 0;
    if (overflowLeft) {
      return 0;
    } else if (overflowRight) {
      return width;
    } else {
      const perc =
        time.diff(timerange[0], "hours", true) /
        timerange[1].diff(timerange[0], "hours", true);
      return perc * width;
    }
  };

  setUpState = () => {
    fetch(`/get_schedule/${this.props.day.id}`)
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          const { allUsers, scheduled, notScheduled } = res;
          this.setState({
            allUsers: allUsers,
            scheduled: scheduled.map((teamMember)=>{
              //convert the time of each user to pixels

            }),
            notScheduled: notScheduled,
          });
        } else {
          this.setState({ redirect: true });
        }
      });
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.day !== this.props.day) {
      this.setUpState();
    }
  };

  render() {
    const { day, isDesktop } = this.props;
    const { scheduled, allUsers, notScheduled, currentFunction, redirect } =
      this.state;


    return (
      allUsers && (
        <div className="tab-maincontent">
          {redirect && <Redirect to={"/scheduletron"} />}
          <Vizualizer day={day} workblocks={scheduled} isDesktop={isDesktop} />
          <Functions
            changeCurrentFunction={this.changeCurrentFunction}
            currentFunction={currentFunction}
            isStatic
          />
          <TheDrawer
          addToSchedule = {this.addToSchedule}
            date={day.date}
            teamMembers={notScheduled}
            changeCurrentFunction={this.changeCurrentFunction}
            currentFunction={currentFunction}
          />
          {/*
    this bricks the app
    <Editor
            hidden={currentFunction !== 1}
            workblocks={scheduled}
            day={day}
            dayId={day.id}
            availableUsers={this.state.notScheduled}
            addToSchedule={this.addToSchedule}
            removeFromSchedule={this.removeFromSchedule}
            handleSlider={this.handleSlider}
      />*/}
        </div>
      )
    );
  }
}

export default MainContent;
