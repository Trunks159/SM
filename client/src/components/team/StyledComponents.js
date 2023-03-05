import { Button, Breadcrumbs } from "@mui/material";
import styled from "@emotion/styled";

const StyledSubmitButton = styled(Button)({
  background: "#0792B6",
  color: "white",
  fontWeight: "bold",
  textTransform: "none",
});

const StyledListButton = styled(Button)(({ theme }) => ({
  color: "black",
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
