import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";

const Message = ({ message }) => {
  return (
    message && (
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        {message}
      </Alert>
    )
  );
};

export default Message;
