import React from "react";
import { Collapse, Button, Alert, AlertTitle } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
            <Button style={{ marginRight: 40 }}>
              <CloseIcon />
            </Button>
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
