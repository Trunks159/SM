import React, { Component } from "react";
import addIcon from "./assets/Add Icon.svg";
import { Collapse } from "@material-ui/core";
import MyToggleButton from "./MyToggleButton";

function AddDrawer({ availableUsers }) {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (e, newValue = false) => setOpen(newValue || !open);
  return (
    <div className="add-drawer">
      <button className="add-button" onClick={toggleDrawer}>
        <img
          style={{
            position: "absolute",
            transitionDuration: ".2s",
            transform: open && "rotate(45deg)",
          }}
          src={addIcon}
        />
      </button>
      <Collapse
        style={{
          background: "white",
        }}
        in={open}
      >
        <div>
          {availableUsers.length > 0 &&
            availableUsers.map(({ firstName, lastName }) => (
              <MyToggleButton>
                {firstName} {lastName}
              </MyToggleButton>
            ))}
        </div>
      </Collapse>
    </div>
  );
}

export default AddDrawer;
