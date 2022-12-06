import { styled, Button, FormControlLabel, TextField } from "@material-ui/core";
import React from "react";
import FancyDivider from "./FancyDivider";

const buttonStyles = {
  borderRadius: 4,
  transitionDuration: ".2s",
  opacity: 1,
  width: 145,
  height: 45,
  "& .MuiButton-label": {
    textTransform: "none",
    fontWeight: 700,
    fontSize: 20,
    color: "white",
  },
};

function Header({ children }) {
  return (
    <header>
      <h1>{children}</h1>
      <FancyDivider />
    </header>
  );
}

const StyledHeader = styled('header')((props)=>({
  margin : '30px 0px',
  fontSize: '38px',
  fontWeight: 'normal',
  margin : '15px 0px',
}))


const StyledSolidButton = styled(Button)({
  ...buttonStyles,
  background: "rgba(7, 145, 182, 1)",
  margin: "20px 0px 20px auto",
  "&:hover": {
    opacity: 0.8,
    background: "rgba(0, 203, 255, 1)",
  },
});

const SolidButton = (props) => <StyledSolidButton type={"submit"} {...props} />;

const StyledOutlinedButton = styled(Button)({
  ...buttonStyles,
  textTransform: "none",
  borderColor: "rgba(7, 145, 182, 1)",
  borderWidth: 1.5,
  "& .MuiButton-label": {
    fontWeight: "normal",
    color: "rgba(7, 145, 182, 1)",
  },
});

const OutlinedButton = (props) => (
  <StyledOutlinedButton variant="outlined" type={"submit"} {...props} />
);

const MyInput = styled(TextField)({
  margin: "15px 0px",
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
