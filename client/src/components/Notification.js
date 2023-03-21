import React, { useEffect, useState } from "react";
import { Collapse, Button, AlertTitle, Alert } from "@mui/material";
import { useSelector } from "react-redux";

function Notification() {
  const [open, setOpen] = useState(false);
  const alert = useSelector((state) => state.alert);
  const { content, title, severity } = alert;

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setOpen(true);
      }, 500);

      setTimeout(() => {
        setOpen(false);
      }, 4000);
    }
  }, [alert]);

  return (
    <div className="main-alert">
      {alert.content && (
        <Collapse in={open}>
          <Alert
            style={{ color: "black" }}
            severity={severity}
            action={<Button style={{ marginRight: 40 }}></Button>}
          >
            {title && <AlertTitle>{title}</AlertTitle>}

            <p> {content}</p>
          </Alert>
        </Collapse>
      )}
    </div>
  );
}

export default Notification;
