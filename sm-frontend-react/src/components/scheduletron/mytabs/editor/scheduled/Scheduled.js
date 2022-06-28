import React, { Component } from "react";
import ProfileTag from "./ProfileTag";
import "./scheduled.css";

class Scheduled extends Component {
  state = {};
  render() {
    const { workblocks } = this.props;
    return (
      <div className="scheduled">
        {workblocks.map((workblock) => (
          <ProfileTag {...workblock} />
        ))}
      </div>
    );
  }
}

export default Scheduled;
