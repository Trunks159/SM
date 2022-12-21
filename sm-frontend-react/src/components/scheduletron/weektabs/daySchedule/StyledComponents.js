import styled from "@emotion/styled";
import { Paper, Button } from "@material-ui/core";

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
  };
});

const StyledPaper = styled(Paper)(() => ({
  position: "relative",
  flexDirection: "row",
  flex: 1,
  background: "#F5F5F5",
  display: "flex",
}));

export { StyledHamburgerButton, StyledPaper };
