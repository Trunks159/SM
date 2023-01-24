import React, { useState, useEffect } from "react";
import { Collapse, Button } from "@mui/material";
import moment from "moment";
import HelpPrompt from "./HelpPrompt/HelpPrompt";
import SavePrompt from "./SavePrompt/SavePrompt";
import TeamPrompt from "./TeamPrompt/TeamPrompt";
import "./thedrawer.css";
import Functions from "../../functions/Functions";
import closeIcon from "./assets/Close Icon.svg";
import styled from "@emotion/styled";
import MyBreadcrumbs from "./MyBreadCrumbs";

const StyledCloseButton = styled(Button)({
  minWidth: 0,
  color: "white",
  position: "absolute",
  top: 0,
  right: 0,
  "&:hover": {
    background: "rgba(255,255,255,.20)",
  },
  margin: "5px",
  height: 32,
  width: 32,
  borderRadius: 16,
  background: "rgba(255,255,255,.04)",
});

function TheDrawer(props) {
  const { currentFunction, changeCurrentFunction } = props;
  const isString = (item) => typeof item === "string" || item instanceof String;
  const isOpen = isString(currentFunction);
  const [crumbs, setCrumbs] = useState([{ label: currentFunction }]);

  useEffect(() => {
    if (crumbs[0].label !== currentFunction) {
      setCrumbs([{ label: currentFunction }]);
    }
  }, [currentFunction]);

  /*
  const addBreadcrumb = (label) => {
    setBreadcrumbs([
      <HeaderButton text={currentFunction} withIcon />,
      <HeaderButton isActive text={label} />,
    ]);
  };
  */
  function handleProfileChange(user) {
    if (user) {
      setCrumbs([...crumbs, { user, label: "Profile" }]);
    } else {
      crumbs.splice(
        crumbs.indexOf(crumbs.find((item) => item.label === "Profile")),
        1
      );
      // [...crumbs.slice(0, index - 1), ...crumbs.slice(index + 1, crumbs.length -1) ]
      setCrumbs(crumbs);
    }
  }

  return (
    <Collapse in={isOpen}>
      <div className="drawer">
        <StyledCloseButton onClick={() => changeCurrentFunction(null)}>
          <img alt="Close" src={closeIcon} />
        </StyledCloseButton>
        <MyBreadcrumbs crumbs={crumbs} />

        <div className="drawer-content">
          <HelpPrompt name="help" currentFunction={currentFunction} />
          <TeamPrompt
            profile={((crumbs) => {
              const profileCrumb = crumbs.find(
                (crumb) => crumb.label === "Profile"
              );
              return profileCrumb && profileCrumb.user;
            })(crumbs)}
            name="team"
            currentFunction={currentFunction}
            handleProfileChange={handleProfileChange}
          />
          <SavePrompt name="save" currentFunction={currentFunction} />
        </div>
        <Functions
          changeCurrentFunction={changeCurrentFunction}
          currentFunction={currentFunction}
        />
      </div>
    </Collapse>
  );
}

export default TheDrawer;
