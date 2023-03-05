import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import logo from "./assets/Logo.svg";

const StyledButton = styled(Button)(({ open }) => ({
  minWidth: 0,
  "& img": {
    transform: `rotate(${open ? "90" : "0"}deg)`,
    transitionDuration: ".2s",
  },
  alignItems: "center",
  justifyContent: "center",
}));

function NavButton({ isOpen, handleOpen, open }) {
  return (
    <StyledButton onClick={() => handleOpen(!isOpen)} open={open}>
      <img src={logo} />
    </StyledButton>
  );
}

export default NavButton;
