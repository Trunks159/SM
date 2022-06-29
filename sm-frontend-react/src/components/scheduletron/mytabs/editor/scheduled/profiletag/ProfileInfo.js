import { Collapse } from "@material-ui/core";
import React, { Component } from "react";

class ProfileInfo extends Component {
  state = {};
  render() {
    const { firstName, lastName, position } = this.props;
    return (
      <Collapse>
        <div>
          <p> {firstName} </p>
          <p> {lastName} </p>
          <p> {position} </p>
        </div>
      </Collapse>
    );
  }
}

export default ProfileInfo;
