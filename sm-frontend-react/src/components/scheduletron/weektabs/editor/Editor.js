import React, { Component } from "react";
import { timeToValue } from "../../../TimeFunctions";
import Available from "./available/Available";
import Scheduled from "./scheduled/Scheduled";
import AddDrawer from "./AddDrawer";
import addIcon from "./assets/Add Icon.svg";
import { Button, Collapse } from "@mui/material";
import "./editor.css";

import AddTeam from "./AddTeam";

class Editor extends Component {
  state = {
    addTeam: false,
  };

  handleAddTeam = () => this.setState({ addTeam: !this.state.addTeam });

  render() {
    const {
      workblocks,
      removeFromSchedule,
      hidden,
      availableUsers,
      addToSchedule,
    } = this.props;
    return (
      <div
        style={{ position: "relative", background: "red", flex: 1 }}
        hidden={hidden}
      >
        {/*<AddDrawer availableUsers={availableUsers} />*/}
        <Scheduled
          workblocks={workblocks}
          removeFromSchedule={removeFromSchedule}
        />

        <Button
          onClick={this.handleAddTeam}
          style={{ position: "fixed", bottom: 10, right: 10 }}
        >
          <img src={addIcon} />
        </Button>
        <AddTeam
          availableUsers={availableUsers}
          isOpen={this.state.addTeam}
          handleAddTeam={this.handleAddTeam}
          addToSchedule={addToSchedule}
        />

        {/*<Available availableUsers={availableUsers} />*/}
      </div>
    );
  }
}

export default Editor;
