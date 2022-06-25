import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Collapse } from "@material-ui/core";

const Message = ({
  message = { severity: "error", title: "Error", content: "Bad something" },
}) => {
  const { severity, title, content } = message;
  return (
    <Collapse in={Boolean(message)}>
      <Alert style={{ borderRadius: 0 }} severity={severity}>
        <AlertTitle>{title}</AlertTitle>
        {content}
      </Alert>
    </Collapse>
  );
};

export default Message;
