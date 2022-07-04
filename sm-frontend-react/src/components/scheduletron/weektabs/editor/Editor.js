import { ToggleButton, Divider, Button } from "@mui/material";
import React, { Component } from "react";
import { timeToValue } from "../../../TimeFunctions";
import Available from "./available/Available";
import Scheduled from "./scheduled/Scheduled";
import backIcon from "./assets/Av Team Members Icon.svg";

class Editor extends Component {
  render() {
    const { workblocks, removeFromSchedule, hidden } = this.props;
    return (
      <div hidden={hidden}>
        <Button startIcon={<img src={backIcon} />}>
          Available Team Members
        </Button>
        <Scheduled
          workblocks={workblocks}
          removeFromSchedule={removeFromSchedule}
        />

        {/*<Available availableUsers={availableUsers} />*/}
      </div>
    );
  }
}

export default Editor;
