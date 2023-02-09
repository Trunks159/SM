import React from "react";
import helpIcon from "./assets/Help Icon.svg";
import teamIcon from "./assets/Team Icon.svg";
import addIcon from "./assets/Add Icon.svg";
import saveIcon from "./assets/Save Icon.svg";
import styled from "@emotion/styled";
import { Button } from "@material-ui/core";

const StyledButton = styled(Button)(({ isActive }) => ({
  opacity: isActive ? 1 : 0.57,
  textTransform: "none",
  "& h3": {
    color: "white",
    textTransform: "capitalize",
    fontWeight: "normal",
  },
  "& .MuiButton-label": {
    gap: 2,
  },
}));

const getIcon = {
  help: helpIcon,
  team: teamIcon,
  add: addIcon,
  save: saveIcon,
};

function HeaderButton({
  text,
  isActive = false,
  withIcon = false,
  updateCrumbs,
  index,
}) {
  return (
    <StyledButton
      startIcon={<img src={withIcon && getIcon[text]} />}
      isActive={isActive}
      onClick={() => updateCrumbs(index)}
    >
      <h3>{text}</h3>
    </StyledButton>
  );
}

export default HeaderButton;