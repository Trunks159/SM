import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";

function SlotLabels() {
  const { slots } = useSelector((state) => state.timeslots);
  return (
    <div style={{ position: "relative",background : 'orange' }}>
      <ul
        style={{
          display: "flex",
          listStyleType: "none",
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      >
        {slots &&
          slots.map(({ user }) => (
            <li style={{ minWidth: 150 }}>
              <Button
                //sized by the grid its in
                style={{
                  textTransform: "capitalize",
                  fontSize: 14,
                  borderBottom: "1px solid rgba(112, 112, 112, .14)",
                }}
              >
                {user.firstName} {user.lastName}
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SlotLabels;
