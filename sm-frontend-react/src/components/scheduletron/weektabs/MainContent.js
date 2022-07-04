import React, { Component } from "react";
import Vizualizer from "./visualizer/Visualizer";
import Editor from "./editor/Editor";

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

  removeFromSchedule = (wbId) => {
    console.log('WBID: ', wbId)
    let { notScheduled, scheduled } = this.state;
    notScheduled.push(
      scheduled.splice(
        scheduled.indexOf(scheduled.find((person) => person.wbId === wbId)),
        1
      )
    );
    this.setState({ notScheduled: notScheduled, scheduled: scheduled });
  };

  componentDidMount = () => {
    fetch(`/get_schedule/${this.props.day.id}`)
      .then((response) => response.json())
      .then(({ allUsers, scheduled, notScheduled }) => {
        this.setState({
          allUsers: allUsers,
          scheduled: scheduled,
          notScheduled: notScheduled,
        });
      });
  };

  render() {
    const { day, isDesktop, currentFunction } = this.props;
    const { scheduled, allUsers } = this.state;
    return (
      allUsers && (
        <>
          <Vizualizer
            hidden={currentFunction !== 0}
            day={day}
            workblocks = {scheduled}
            isDesktop={isDesktop}
          />
          <Editor
            hidden={currentFunction !== 1}
            workblocks={scheduled}
            dayId={day.id}
            removeFromSchedule={this.removeFromSchedule}
            allUsers={allUsers}
          />
          <div hidden={currentFunction !== 2}>Metrics</div>
          <div hidden={currentFunction !== 3}>Save</div>
        </>
      )
    );
  }
}

export default MainContent;
