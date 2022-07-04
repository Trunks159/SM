import React, { Component } from "react";
import actionsIcon from "../../../../assets/images/Actions Icon.svg";
import { Collapse } from "@material-ui/core";

function FunctionsDrawer({ children }) {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (e, newValue = false) => setOpen(newValue || !open);

  return (
    <div className="actions-drawer">
      <button className="actions-drawer-mainButton" onClick={toggleDrawer}>
        <img
          style={{
            position: "absolute",
            transitionDuration: ".3s",
            transform: open && "rotate(180deg)",
          }}
          src={actionsIcon}
        />
      </button>
      <Collapse
        style={{
          background: "white",
        }}
        in={open}
      >
        {children}
      </Collapse>
    </div>
  );
}

export default FunctionsDrawer;
