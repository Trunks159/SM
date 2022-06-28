import React, { Component } from "react";
import { Card, CardContent, Collapse } from "@mui/material";
import MySlider from "./MySlider";

class ProfileTag extends Component {
  state = {};
  render() {
    console.log("Myuser: ", this.props.user);
    const { user, startTime, endTime } = this.props;
    const { firstName } = user;
    return (
      <Card className="profile-tag">
        <h2>{firstName}</h2>
        <MySlider />
      </Card>
    );
  }
}

export default ProfileTag;
