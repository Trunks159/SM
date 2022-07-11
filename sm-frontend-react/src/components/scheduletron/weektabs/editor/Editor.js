import React, { Component } from "react";
import { timeToValue } from "../../../TimeFunctions";
import Available from "./available/Available";
import Scheduled from "./scheduled/Scheduled";
import AddDrawer from "./AddDrawer";
import "./editor.css";

class Editor extends Component {
  render() {
    const { workblocks, removeFromSchedule, hidden, availableUsers } =
      this.props;
    return (
      <div hidden={hidden}>
        {/*<AddDrawer availableUsers={availableUsers} />*/}
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
