import { ToggleButton, Divider } from "@mui/material";
import React, { Component } from "react";
import { timeToValue } from "../../../TimeFunctions";
import Available from "./available/Available";
import Scheduled from "./scheduled/Scheduled";

class Editor extends Component {

  render() {
    const {workblocks, removeFromSchedule, hidden} = this.props;
    return (
      <div hidden = {hidden}>
        <Scheduled workblocks={workblocks} removeFromSchedule = {removeFromSchedule}/>
        {/*<Available availableUsers={availableUsers} />*/}
      </div>
    );
  }
}

export default Editor;
