import React, { Component, useEffect } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Collapse } from "@mui/material";
import closeIcon from "../assets/images/Close Icon.svg";

const backgroundColor = {
  error: "rgba(255, 0, 0, .95)",
  warning: "rgba(255, 239, 210, .95)",
  success: "rgba(219, 255, 210, .95)",
};

const Notification = ({ message }) => {
  return (
    <div
      style={{
        position: "fixed",
        left: 60,
        right: 0,
        zIndex: 1,
      }}
    >
      <Collapse in={Boolean(message)}>
        <Alert
          style={{ color: "white" }}
          position
          severity={message ? message.severity : "error"}
          action={
            <button
              style={{ background: "none", border: "none", marginRight: 40 }}
            >
              <img style={{ width: 15 }} src={closeIcon} />
            </button>
          }
        >
          <AlertTitle>{message ? message.title : "Error"}</AlertTitle>
          {message ? message.content : ""}
        </Alert>
      </Collapse>
    </div>
  );
};

export default Notification;
