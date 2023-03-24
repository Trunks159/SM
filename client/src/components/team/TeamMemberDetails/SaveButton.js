import React from "react";
import { Button } from "@mui/material";
import saveIcon from "./assets/Save Icon.svg";

function SaveButton({ hasChanged, children }) {
  return (
    <Button
      disabled={!hasChanged}
      endIcon={<img alt="save" src={saveIcon} />}
      sx={{
        textTransform: "none",
        background: "#0792B6",
        color: "white",
        "&:hover": {
          background: "#0B7792",
        },
        marginLeft: "auto",
        "&.Mui-disabled": {
          color: "white",
          opacity: 0.8,
          background: "#6CBDD2",
        },
        padding: "10px 15px",
      }}
      type={"submit"}
    >
      Save {children} Changes
    </Button>
  );
}

export default SaveButton;
