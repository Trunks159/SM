import React, { Component } from "react";

class AddPrompt extends Component {
  state = {};
  render() {
    const { teamMembers, currentTab, index } = this.props;
    return (
      <div style={{ display: currentTab === index ? "flex" : "none" }}>
        <h3>Select team members you'd like to add to the schedule</h3>

        <div>
          {teamMembers.map((tm) => (
            <div>
              {tm.firstName} {tm.lastName} {tm.position}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AddPrompt;
