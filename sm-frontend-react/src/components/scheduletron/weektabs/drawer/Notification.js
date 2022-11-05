import { Collapse } from "@mui/material";
import React, { useEffect, useState } from "react";

/*
So the component is actually always mounted.
When the message goes from null to something,
set message to message then set collapse to in
when message goes from something to null,
set collapse to false in then once its set set message to null


If incoming message exists, set mesage to that message,
set message to it and open at the same time

If not set open to false and useeffect will see that and update message to null
afterwards

In the second useeffect do nothing if open is now true

*/

function Notification(props) {
  const incomingMessage = props.message;
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);

  useEffect(() => {
    if (incomingMessage) {
      setMessage(incomingMessage );
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [incomingMessage]);

  
  useEffect(() => {
    if (open === false){
     setMessage(null);
    }
  }, [open]);

  return <Collapse in={open}>{message}</Collapse>;
}

export default Notification;
