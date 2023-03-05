import styled from "@emotion/styled";
import { Paper, Button } from "@mui/material";

const StyledHamburgerButton = styled(Button)(({ hidden }) => {
  return {
    display: hidden ? "none" : "flex",
    background: "#585858",
    position: "absolute",
    bottom: 13,
    right: 13,
    "&:hover": {
      background: "black",
    },
    zIndex: 1,
  };
});

const StyledPaper = styled(Paper)(() => ({
  display: "flex",
}));

export { StyledHamburgerButton, StyledPaper };
