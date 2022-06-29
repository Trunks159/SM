import { Collapse } from "@material-ui/core";
import React, { Component } from "react";

class ProfileInfo extends Component {
  state = {
    expanded: false,
    profileInfo: null,
  };

  componentDidUpdate = (prevProps) => {
    const { expanded, userId, dayId } = this.props;
    if (expanded && !this.state.profileInfo) {
      console.log("Im runnin: ", expanded);
      fetch(`/profile_info/${userId}/${dayId}`)
        .then((response) => response.json())
        .then((user) => this.setState({ profileInfo: user, expanded: true }));
    }
  };

  render() {
    return (
      <Collapse in={this.state.expanded}>
        {this.state.profileInfo ? (
          <>
            <p> {this.state.profileInfo.firstName} </p>
            <p> {this.state.profileInfo.lastName} </p>
            <p> {this.state.profileInfo.position} </p>
          </>
        ) : (
          <p>Loading Profile</p>
        )}
      </Collapse>
    );
  }
}

export default ProfileInfo;
