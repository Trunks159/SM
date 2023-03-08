import React from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Tabs, Tab, Paper } from "@mui/material";
import { StyledHamburgerButton } from "../../StyledComponents";
import blackHelpIcon from "./assets/Black Help Icon.svg";
import blackSaveIcon from "./assets/Black Save Icon.svg";
import blackTeamIcon from "./assets/Black Team Icon.svg";
import menuIcon from "./assets/Menu Icon.svg";
import helpIcon from "./assets/Help Icon.svg";
import teamIcon from "./assets/Team Icon.svg";
import saveIcon from "./assets/Save Icon.svg";
import TheDrawer from "./TheDrawer";
import "./functions.css";

const isString = (item) => typeof item === "string" || item instanceof String;

const StyledTabs = styled(Tabs)(({ value, theme }) => {
  return {
    background: value ? "rgba(46, 58, 64, 1)" : "none",
    color: isString(value) ? "white" : "black",
    width: "100%",
    "& .MuiTabs-indicator": {
      background: "white",
      right: 0,
    },
    "& .Mui-selected": {
      opacity: 1,
    },
    "& .MuiTabs-flexContainer": {
      justifyContent: "space-evenly",
    },

    [theme.breakpoints.up("sm")]: {
      marginTop: "auto",
      width: 80,
      height: "max-content",
      "& .MuiTabs-flexContainer": {
        justifyContent: "flex-start",
      },
    },
  };
});

const StyledTab = styled(Tab)({
  textTransform: "none",
  transitionDuration: ".2s",
  minWidth: 0,
  fontSize: 12,
  fontWeight: 400,
  opacity: 0.7,
  "& .tab-label": {
    opacity: 0,
    transitionDuration: ".2s",
  },
  "& .MuiTab-iconWrapper": {
    marginBottom: 8,
  },
  "&.Mui-selected": {
    fontSize: 12,
    color: "white",
    "& .tab-label": {
      opacity: 1,
    },
  },
  "&:hover": {
    opacity: 1,
  },
});

const MyPaper = styled(Paper)(({ theme, isOpen }) => ({
  background: isOpen ? "#2E3A40" : "white",
  transitionDuration: ".2s",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
    position: "relative",
    borderRadius: 0,
  },
}));

function Functions({
  currentFunction,
  changeCurrentFunction,
  hidden,
  isReadOnly,
  date,
}) {
  const isOpen = isString(currentFunction);
  const screenWidth = useSelector((state) => state.screenWidth);
  const isDesktop = screenWidth >= 600;
  return (
    <div
      className={`functions-main${
        currentFunction ? " functions-main-open" : ""
      }`}
    >
      {/*Everything else only displays if either on desktop or active */}
      {isDesktop || currentFunction ? (
        <>
          <TheDrawer
            isReadOnly={isReadOnly}
            date={date}
            changeCurrentFunction={changeCurrentFunction}
            currentFunction={currentFunction}
            isDesktop={isDesktop}
          />
          <MyPaper isOpen={Boolean(currentFunction)}>
            <StyledTabs
              onChange={(e, newVal) => changeCurrentFunction(newVal)}
              value={currentFunction}
              orientation={isDesktop ? "vertical" : "horizontal"}
              hidden={hidden}
            >
              <StyledTab
                value={"help"}
                label={<span className="tab-label">Help</span>}
                icon={
                  <img
                    alt="Help"
                    src={isOpen || !isDesktop ? helpIcon : blackHelpIcon}
                  />
                }
              />
              <StyledTab
                value={"team"}
                label={<span className="tab-label">Team</span>}
                icon={
                  <img
                    alt="Team"
                    src={isOpen || !isDesktop ? teamIcon : blackTeamIcon}
                  />
                }
              />
              <StyledTab
                value={"save"}
                label={<span className="tab-label">Save</span>}
                icon={
                  <img
                    alt="Save"
                    src={isOpen || !isDesktop ? saveIcon : blackSaveIcon}
                  />
                }
              />
              <Tab value={null} style={{ display: "none" }} />
            </StyledTabs>
          </MyPaper>
        </>
      ) : (
        <StyledHamburgerButton onClick={() => changeCurrentFunction("team")}>
          <img src={menuIcon} />
        </StyledHamburgerButton>
      )}
    </div>
  );
}

export default Functions;
