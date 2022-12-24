import React from "react";
import blackAddIcon from "./assets/Black Add Icon.svg";
import blackSaveIcon from "./assets/Black Save Icon.svg";
import blackEditIcon from "./assets/Black Edit Icon.svg";
import editIcon from "./assets/Edit Icon.svg";
import addIcon from "./assets/Add Icon.svg";
import saveIcon from "./assets/Save Icon.svg";
import { Tabs, Tab } from "@material-ui/core";
import styled from "@emotion/styled";

const StyledTabs = styled(Tabs)(({ value, hidden }) => {
  return {
    zIndex: 1,
    "& .MuiTabs-indicator": {
      background: "white",
      left: 0,
    },
    opacity: 0.7,
    "& .Mui-selected": {
      opacity: 1,
    },
    "& .MuiTabs-flexContainer": {
      justifyContent: "center",
    },
    color: Number.isInteger(value) ? "white" : "black",
    position: "absolute",
    bottom: 0,
    right: 0,
    display: hidden ? "none" : "flex",
  };
});

const StyledTab = styled(Tab)({
  textTransform: "none",
  transitionDuration: ".25s",
  minWidth: 0,
  padding: "0px 20px",
  fontSize: 12,
  fontWeight: "400",
  opacity: 0.7,
  "& .MuiTab-iconWrapper": {
    marginBottom: 8,
  },
  "& Mui-selected": {},
  "&:hover": {
    opacity: 1,
  },
});

function Functions({ currentFunction, changeCurrentFunction, hidden }) {
  const isOpen = Number.isInteger(currentFunction);
  return (
    <StyledTabs
      onChange={(e, newVal) => changeCurrentFunction(newVal)}
      value={currentFunction}
      orientation={"vertical"}
      hidden={hidden}
    >
      <StyledTab
        value={0}
        label="Edit"
        icon={<img alt="Edit" src={isOpen ? editIcon : blackEditIcon} />}
      />
      <StyledTab
        value={1}
        label="Add"
        icon={<img alt="Add" src={isOpen ? addIcon : blackAddIcon} />}
      />
      <StyledTab
        value={2}
        label="Save"
        icon={<img alt="Save" src={isOpen ? saveIcon : blackSaveIcon} />}
      />
      <Tab value={null} style={{ display: "none" }} />
    </StyledTabs>
  );
}

export default Functions;
