import React, { Component } from "react";
import Vizualizer from "./visualizer/Visualizer";
import Editor from "./editor/Editor";
import { timeToValue } from "../../TimeFunctions";

class MainContent extends Component {
  state = {
    allUsers: [],
    scheduled: [],
    notScheduled: [],
  };

  getAvailableUsers = () => {
    const { allUsers, scheduledBlocks } = this.state;
    const scheduledUsersIds = scheduledBlocks.map(({ user }) => user.id);

    return allUsers.filter(({ id }) => scheduledUsersIds.includes(id));
  };

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
    console.log("Scheduled: ", scheduled);
    const user = notScheduled.splice(
      notScheduled.indexOf(notScheduled.find((person) => person.id === userId)),
      1
    )[0];

    console.log("Myuser: ", user);
    scheduled.push({
      user: user,
      startTime: timeToValue("08:00"),
      endTime: timeToValue("16:00"),
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
    fetch(`/get_schedule/${this.props.day.id}`)
      .then((response) => response.json())
      .then(({ allUsers, scheduled, notScheduled }) => {
        this.setState({
          allUsers: allUsers,
          scheduled: scheduled.map((workblock) => ({
            ...workblock,
            startTime: timeToValue(workblock.startTime),
            endTime: timeToValue(workblock.endTime),
          })),
          notScheduled: notScheduled,
        });
      });
  };

  render() {
    const { day, isDesktop, currentFunction } = this.props;
    const { scheduled, allUsers } = this.state;
    return (
      allUsers && (
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: isDesktop ? 0 :  57 ,
            bottom: 0,
            overflowY: "auto",
            left:  isDesktop ? 57:  0,
            right: 0,
          }}
        >
          <Vizualizer
            hidden={currentFunction !== 0}
            day={day}
            workblocks={scheduled}
            isDesktop={isDesktop}
          />
          <Editor
            hidden={currentFunction !== 1}
            workblocks={scheduled}
            dayId={day.id}
            availableUsers={this.state.notScheduled}
            addToSchedule={this.addToSchedule}
            removeFromSchedule={this.removeFromSchedule}
            handleSlider={this.handleSlider}
          />
          <div hidden={currentFunction !== 2}>Metrics</div>
          <div hidden={currentFunction !== 3}>Save</div>
        </div>
      )
    );
  }
}

export default MainContent;
