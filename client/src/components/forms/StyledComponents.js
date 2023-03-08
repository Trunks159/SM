import React from "react";
import FancyDivider from "./FancyDivider";
import { Button, FormControlLabel, TextField } from "@mui/material";
import styled from "@emotion/styled";

function Header({ children }) {
  return (
    <StyledHeader>
      <h1>{children}</h1>
      <FancyDivider />
    </StyledHeader>
  );
}

const StyledHeader = styled("header")(() => ({
  fontSize: "38px",
  fontWeight: "normal",
  margin: "15px 0px",
}));

const SolidButton = styled(Button)({
  background: "#0792B6",
  color: "white",
  textTransform: "none",
  width: 160,
  height: 50,
  margin: "20px 0px 20px auto",
  "&:hover": {
    background: "#15CFFF",
  },
  fontSize: 20,
});

const StyledOutlinedButton = styled(Button)({
  textTransform: "none",
  borderColor: "#0792B6",
  borderWidth: 1.5,
  fontWeight: "normal",
  color: "#0792B6",
  width: 160,
  height: 50,
  fontSize: 20,
});

const OutlinedButton = (props) => (
  <StyledOutlinedButton variant="outlined" type={"submit"} {...props} />
);

const MyInput = styled(TextField)({
  "& .MuiFormHelperText-root": {
    position: "absolute",
    bottom: -20,
  },
});

const RememberMe = styled(FormControlLabel)({
  margin: "7px 0px",
  width: "max-content",
  "& .MuiTypography-root": {
    fontSize: 12,
  },
});

export { SolidButton, OutlinedButton, MyInput, RememberMe, Header };
