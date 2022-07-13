import React, { Component } from "react";
import Scheduled from "./scheduled/Scheduled";
import addIcon from "./assets/Add Icon.svg";
import { Button } from "@mui/material";
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
      dayId,
      handleSlider,
    } = this.props;
    return (
      <div hidden={hidden}>
        <Scheduled
          dayId={dayId}
          workblocks={workblocks}
          removeFromSchedule={removeFromSchedule}
          handleSlider={handleSlider}
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
      </div>
    );
  }
}

export default Editor;
