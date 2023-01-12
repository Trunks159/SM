import React, { Component } from "react";
class TeamPrompt extends Component {
  state = {};
  render() {
    const { currentFunction, index } = this.props;
    return (
      <div style={{ display: currentFunction === index ? "flex" : "none" }}>
       dd
      </div>
    );
  }
}

export default TeamPrompt;
