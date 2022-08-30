import React from "react";
import addIcon from "./assets/Add Icon.svg";
import submitIcon from "./assets/Submit Icon.svg";
import editIcon from "./assets/Edit Icon.svg";
import { Button } from "@material-ui/core";

const Functions = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        right: 0,
        bottom: 10,
        gap: 20,
        margin: "20px 0px",
      }}
    >
      <Button>
        <img src={addIcon} />
      </Button>
      <Button>
        <img src={editIcon} />
      </Button>
      <Button>
        <img src={submitIcon} />
      </Button>
    </div>
  );
};

export default Functions;
