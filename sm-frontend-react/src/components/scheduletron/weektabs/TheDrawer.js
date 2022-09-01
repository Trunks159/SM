import { Tabs, Tab, Collapse, Button } from "@mui/material";
import React, { Component } from "react";
import editIcon from "./assets/Edit Icon.svg";
import addIcon from "./assets/Add Icon.svg";
import saveIcon from "./assets/Save Icon.svg";

class TheDrawer extends Component {
  state = {
    open: true,
    currentTab: 0,
  };

  changeTab = (e, newTab) => {
    this.setState({
      currentTab: newTab,
    });
  };

  render() {
    const { month, weekday, day, teamMembers } = this.props;
    const { currentTab } = this.state;
    return (
      <Collapse in={this.state.open}>
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            right: 0,
            left: 70,
            background: "rgba(0,0,0,.66)",
            color: "white",
          }}
        >
          <h1>
            {weekday} {`${month}/${day}`}
          </h1>
          <hr />
          <Tabs onChange={this.changeTab} value={currentTab}>
            <Tab value={0} label="Edit" icon={<img src={editIcon} />} />
          </Tabs>
          <div style={{ display: currentTab === 0 ? "flex" : "none" }}>
            <h3>Select team members you'd like to add to the schedule</h3>

            <div>
              {teamMembers.map((tm) => (
                <div>
                  {tm.firstName} {tm.lastName} {tm.position}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Collapse>
    );
  }
}

export default TheDrawer;
