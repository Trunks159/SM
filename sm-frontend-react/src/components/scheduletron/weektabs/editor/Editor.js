import React, { Component } from "react";
import { timeToValue } from "../../../TimeFunctions";
import Available from "./available/Available";
import Scheduled from "./scheduled/Scheduled";
import AddDrawer from "./AddDrawer";
import addIcon from "./assets/Add Icon.svg";
import { Button, Collapse } from "@mui/material";
import "./editor.css";

class Editor extends Component {
  render() {
    const { workblocks, removeFromSchedule, hidden, availableUsers } =
      this.props;
    return (
      <div style={{ position: "relative" }} hidden={hidden}>
        {/*<AddDrawer availableUsers={availableUsers} />*/}
        <Scheduled
          workblocks={workblocks}
          removeFromSchedule={removeFromSchedule}
        />
        <Button style={{ position: "fixed", bottom: 10, right: 10 }}>
          <img src={addIcon} />
        </Button>

        <Collapse in={true}>
          <div
            style={{
              background: "#AAAAAA",
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <p style={{ color: "white" }}>Select Team Members</p>
            {availableUsers.map((u) => (
              <Button
                style={{
                  textTransform: "capitalize",
                  color: "black",
                  background: "white",
                  borderRadius: 7,
                }}
              >
                {u.firstName} {u.lastName.charAt(0).toUpperCase()}
              </Button>
            ))}
          </div>
        </Collapse>

        {/*<Available availableUsers={availableUsers} />*/}
      </div>
    );
  }
}

export default Editor;
