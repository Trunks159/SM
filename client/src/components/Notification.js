import React, { useEffect, useState } from "react";
import { Collapse, Button, AlertTitle, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

//1. message comes in
//1a. content goes from false to true
//2. Useeffect notices this and updates state
//3. After say .1s collapses in
//4. On close (done by close button or by alert.content going off)
//5. Sets open to false
//6. Component react to this false in the new render and resets state

const updateAlert = (newAlert) => ({
  type: "UPDATE_ALERT",
  payLoad: newAlert,
});

const initialState = {
  content: null,
  title: null,
  severity: null,
  open: false,
};

function Notification() {
  const [state, setState] = useState(initialState);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const { content, title, severity, open } = state;

  useEffect(() => {
    //if content come in from alert

    if (alert) {
      setState({ ...alert, open });
      setTimeout(() => {
        dispatch(updateAlert(null));
      }, 4000);
    } else {
      handleClose();
    }
  }, [alert]);
  useEffect(() => {
    //if content goes from - to +, open collapse
    if (content) {
      setState({ ...state, open: true });
    }
  }, [content]);

  useEffect(() => {
    //if collapsing and state is occupied, reset state
    if (!open && content) {
      //literally just so it slides out smoothly
      setTimeout(() => {
        setState(initialState);
      }, 90);
    }
  }, [open]);

  function handleClose() {
    setState({ ...state, open: false });
    if (alert) {
      alert.closeMessage();
    }
  }

  return (
    <div className="main-alert">
      <Collapse in={open}>
        <Alert
          style={{ color: "black" }}
          severity={"success"}
          action={<Button style={{ marginRight: 40 }}></Button>}
        >
          <AlertTitle>{title}</AlertTitle>
          {content}
        </Alert>
      </Collapse>
    </div>
  );
}

export default Notification;
