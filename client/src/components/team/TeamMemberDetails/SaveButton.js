import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import saveIcon from "./assets/Save Icon.svg";

const StyledSaveButton = styled(Button)({
  textTransform: "none",
  background: "#568692",
  color: "white",
  "&:hover": {
    background: "#0B7792",
  },
  marginLeft: "auto",
  "&.Mui-disabled": {
    color: "white",
    opacity: 0.8,
    background: "#D6D6D6",
  },
  padding: "10px 15px",
});

function SaveButton({ hasChanged, handleSave, text }) {
  return (
    <StyledSaveButton
      disabled={!hasChanged}
      endIcon={<img alt="save" src={saveIcon} />}
      onClick={() => handleSave(hasChanged)}
    >
      Save {text} Changes
    </StyledSaveButton>
  );
}

export default SaveButton;
