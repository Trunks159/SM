import { Button, Breadcrumbs } from "@mui/material";
import styled from "@emotion/styled";

const StyledSubmitButton = styled(Button)({
  background: "#0792B6",
  color: "white",
  fontWeight: "bold",
  textTransform: "none",
});

const StyledListButton = styled(Button)(({ theme, removing }) => ({
  color: removing ? "white" : "black",
  background: removing ? "#FF4B4B" : "none",
  fontSize: 14,
  fontWeight: "normal",
  textTransform: "none",
  "& .button-text": {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  "& img": {
    width: 25,
    filter: removing
      ? "invert(100%) sepia(100%) saturate(1%) hue-rotate(295deg) brightness(103%) contrast(102%)"
      : "none",
  },
}));

const StyledBreadcrumbs = styled(Breadcrumbs)({
  "& ol": {
    rowGap: 5,
  },
  gridArea: "breadcrumbs",
});

const StyledAdvancedButton = styled(Button)({
  color: "black",
  opacity: ".8",
  textTransform: "none",
  fontWeight: "normal",
  fontSize: 14,
  gap: 5,
});

export {
  StyledListButton,
  StyledAdvancedButton,
  StyledBreadcrumbs,
  StyledSubmitButton,
};
