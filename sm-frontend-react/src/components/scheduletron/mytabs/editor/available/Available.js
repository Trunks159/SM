import React from "react";
import MyToggleButton from "../MyToggleButton";
import { Divider } from "@mui/material";

function Available({ availableUsers }) {
  return (
    <div style={{ flex: 1, margin: "0px 10px", background: "#EAEAEA" }}>
      <h2 style={{ margin: 20 }}>Available Team Members</h2>
      <Divider sx={{ margin: "0px 10px" }} />
      <ul
        style={{
          display: "grid",
          width: 300,
          gridTemplateColumns: "1fr 1fr",
          gridGap: 10,
        }}
      >
        {availableUsers.map(({ firstName, lastName }) => (
          <MyToggleButton>
            {firstName} {lastName}
          </MyToggleButton>
        ))}
      </ul>
    </div>
  );
}

export default Available;
