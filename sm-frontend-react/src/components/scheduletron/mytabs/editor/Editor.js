import { ToggleButton, Divider } from "@mui/material";
import React, { Component } from "react";
import { timeToValue } from "../../../TimeFunctions";
import MyToggleButton from "./MyToggleButton";

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
        <div style={{ flex: 1, margin: "0px 10px", background: "#EAEAEA" }}>
          <h2 style={{ margin: 20 }}>Available Team Members</h2>
          <Divider sx={{ margin: "0px 10px" }} />
          <ul
            style={{
              display: "grid",
              width: 300,
              gridTemplateColumns: "1fr 1fr",
              gridGap: 10,
            }}
          >
            {availableUsers.map(({ firstName, lastName }) => (
              <MyToggleButton>
                {firstName} {lastName}
              </MyToggleButton>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  }
}

export default Editor;
