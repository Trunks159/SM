import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";

const Message = ({ message }) => {
  return (
    message && (
      <Alert severity={message.severity}>
        <AlertTitle>{message.title}</AlertTitle>
        {message.content}
      </Alert>
    )
  );
};

export default Message;
