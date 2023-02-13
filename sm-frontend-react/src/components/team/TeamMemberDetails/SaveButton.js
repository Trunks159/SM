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
});

function SaveButton({ hasChanged, handleSave }) {
  return (
    <StyledSaveButton
      disabled={!hasChanged}
      endIcon={<img alt="save" src={saveIcon} />}
      onClick={() => handleSave(hasChanged)}
    >
      Save Changes
    </StyledSaveButton>
  );
}

export default SaveButton;
