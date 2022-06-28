import { ToggleButton, Divider } from "@mui/material";
import React, { Component } from "react";
import { timeToValue } from "../../../TimeFunctions";
import Available from "./available/Available";
import Scheduled from "./scheduled/Scheduled";

class Editor extends Component {
  state = {
    allUsers: [],
    scheduledUsers: this.props.workblocks,
  };

  getAvailableUsers = () => {
    const { allUsers, scheduledUsers } = this.state;
    const scheduledUsersIds = scheduledUsers.map(({ user }) => user.id);

    return allUsers.filter(({ id }) => scheduledUsersIds.includes(id));
  };

  componentDidMount = () => {
    fetch("/users")
      .then((response) => response.json())
      .then(({ users }) => {
        this.setState({ allUsers: users });
      });
  };
  render() {
    if (this.state.allUsers) {
      const availableUsers = this.getAvailableUsers();
      return (
        <div>
          <Scheduled workblocks={this.state.scheduledUsers} />
          {/*<Available availableUsers={availableUsers} />*/}
        </div>
      );
    }
    return null;
  }
}

export default Editor;
