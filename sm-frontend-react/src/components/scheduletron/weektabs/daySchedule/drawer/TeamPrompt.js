import React, { Component } from "react";
class TeamPrompt extends Component {
  state = {};
  render() {
    const { currentFunction, name } = this.props;
    return (
      <div style={{ display: currentFunction === name ? "flex" : "none" }}>
        dd
      </div>
    );
  }
}

export default TeamPrompt;
