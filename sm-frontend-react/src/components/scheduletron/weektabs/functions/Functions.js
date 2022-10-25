import React from "react";
import blackAddIcon from "./assets/Black Add Icon.svg";
import blackSaveIcon from "./assets/Black Save Icon.svg";
import blackEditIcon from "./assets/Black Edit Icon.svg";
import editIcon from "./assets/Edit Icon.svg";
import addIcon from "./assets/Add Icon.svg";
import saveIcon from "./assets/Save Icon.svg";
import { Tabs, Tab } from "@mui/material";
import styled from "@emotion/styled";

const StyledTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    background: "white",
    left: 0,
  },
  "& .Mui-selected": {
    opacity: 1,
    color: "white",
  },
  "& .MuiTabs-flexContainer": {
    justifyContent: "center",
  },
  position: "absolute",
  bottom: 0,
  right: 0,
});

const StyledTab = styled(Tab)({
  textTransform: "none",
  transitionDuration: ".25s",
  minWidth: 0,
  padding: "0px 20px",
  minWidth: 0,
  fontSize: 12,
  fontWeight: "400",
  opacity: 0.7,
  color: "black",
  "& .MuiTab-iconWrapper": {
    marginBottom: 8,
  },
  "& Mui-selected": {
    opacity: 1,
    color: "white",
  },
  "&:hover": {
    opacity: 0.9,
  },
});

function Functions({ currentFunction, changeCurrentFunction }) {
  const isOpen = Number.isInteger(currentFunction);
  return (
    <StyledTabs
      onChange={(e, newVal) => changeCurrentFunction(newVal)}
      value={currentFunction}
      orientation={"vertical"}
    >
      <StyledTab
        value={0}
        label="Edit"
        icon={<img src={isOpen ? editIcon : blackEditIcon} />}
      />
      <StyledTab
        value={1}
        label="Add"
        icon={<img src={isOpen ? addIcon : blackAddIcon} />}
      />
      <StyledTab
        value={2}
        label="Save"
        icon={<img src={isOpen ? saveIcon : blackSaveIcon} />}
      />
    </StyledTabs>
  );
}

export default Functions;
