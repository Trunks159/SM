import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Collapse } from "@material-ui/core";

const Message = ({ message }) => {
  return (
    <Collapse in={Boolean(message)}>
      <Alert
        style={{ borderRadius: 0 }}
        severity={message ? message.severity : "error"}
      >
        <AlertTitle>{message ? message.title : "Error"}</AlertTitle>
        {message ? message.content : "Bad Something"}
      </Alert>
    </Collapse>
  );
};

export default Message;
