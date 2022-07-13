import React, { Component } from "react";
import { Button, Collapse } from "@mui/material";
import closeIcon from "./assets/Close Icon.svg";

class AddTeam extends Component {
  state = {};
  render() {
    const { availableUsers, isOpen, handleAddTeam, addToSchedule } = this.props;

    return (
      <div
        style={{
          background: "rgba(61,61,61, .86)",
          flexDirection: "column",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          width: 134,
          overflowY : 'auto',
          display: isOpen ? "flex" : "none",
        }}
      >
        <Button
          style={{
            minWidth: 0,
            minHeight: 0,
            marginLeft: "auto",
          }}
          onClick={handleAddTeam}
        >
          <img src={closeIcon} />
        </Button>
        <p
          style={{
            color: "white",
            fontSize: 12,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Select Team Members
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            alignItems: "center",
          }}
        >
          {availableUsers.map((u) => (
            <Button
              onClick={() => addToSchedule(u.id)}
              style={{
                textTransform: "capitalize",
                color: "black",
                background: "white",
                borderRadius: 7,
                width: 94,
                height: 46,
              }}
            >
              {u.firstName} {u.lastName.charAt(0).toUpperCase()}
            </Button>
          ))}
        </div>
      </div>
    );
  }
}

export default AddTeam;
