import { Divider } from "@mui/material";
import React, { Component } from "react";
import { timeToValue } from "../../../TimeFunctions";

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
        <div style={{ flex: 1 }}>
          <h2>Available Team Members</h2>
          <Divider />
          <ul
            style={{
              display: "grid",
              width: 300,
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            {availableUsers.map(({ firstName, lastName }) => (
              <p
                style={{
                  textTransform: "capitalize",
                  width: 150,
                  background: "red",
                }}
              >
                {firstName} {lastName}
              </p>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  }
}

export default Editor;
