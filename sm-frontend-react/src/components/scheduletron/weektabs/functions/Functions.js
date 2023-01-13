import React from "react";
import blackHelpIcon from "./assets/Black Help Icon.svg";
import blackAddIcon from "./assets/Black Add Icon.svg";
import blackSaveIcon from "./assets/Black Save Icon.svg";
import blackTeamIcon from "./assets/Black Team Icon.svg";
import helpIcon from "./assets/Help Icon.svg";
import teamIcon from "./assets/Team Icon.svg";
import addIcon from "./assets/Add Icon.svg";
import saveIcon from "./assets/Save Icon.svg";
import { Tabs, Tab, hexToRgb } from "@material-ui/core";
import styled from "@emotion/styled";

const StyledTabs = styled(Tabs)(({ value, hidden }) => {
  return {
    zIndex: 1,
    "& .MuiTabs-indicator": {
      background: "white",
      right: 0,
    },

    "& .Mui-selected": {
      opacity: 1,
    },
    "& .MuiTabs-flexContainer": {
      justifyContent: "center",
    },
    opacity: 0.7,
    color: Number.isInteger(value) ? "white" : "black",
    position: "absolute",
    bottom: 12,
    right: 0,
    display: hidden ? "none" : "flex",
    background: Number.isInteger(value) ? "rgba(23, 53, 69, .92)" : "none",
    borderRadius: "7px 0px 0px 7px",
  };
});

const StyledTab = styled(Tab)({
  textTransform: "none",
  transitionDuration: ".25s",
  minWidth: 0,
  padding: "0px 20px",
  fontSize: 0,
  fontWeight: "400",
  opacity: 0.7,
  "& .MuiTab-iconWrapper": {
    marginBottom: 8,
  },
  "&.Mui-selected": {
    fontSize: 12,
  },
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
        label="Help"
        icon={<img alt="Help" src={isOpen ? helpIcon : blackHelpIcon} />}
      />
      <StyledTab
        value={1}
        label="Team"
        icon={<img alt="Team" src={isOpen ? teamIcon : blackTeamIcon} />}
      />
      <StyledTab
        value={2}
        label="Add"
        icon={<img alt="Add" src={isOpen ? addIcon : blackAddIcon} />}
      />
      <StyledTab
        value={3}
        label="Save"
        icon={<img alt="Save" src={isOpen ? saveIcon : blackSaveIcon} />}
      />
      <Tab value={null} style={{ display: "none" }} />
    </StyledTabs>
  );
}

export default Functions;
