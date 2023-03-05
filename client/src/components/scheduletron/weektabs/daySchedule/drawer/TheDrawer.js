import React, { useState, useEffect } from "react";
import { Button, Alert } from "@mui/material";
import styled from "@emotion/styled";
import "./thedrawer.css";
import HelpPrompt from "./HelpPrompt/HelpPrompt";
import SavePrompt from "./SavePrompt/SavePrompt";
import TeamPrompt from "./TeamPrompt/TeamPrompt";
import MyBreadcrumbs from "./MyBreadCrumbs";
import closeIcon from "./assets/Close Icon.svg";
import Notification from "./Notification";

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
  const { currentFunction, changeCurrentFunction, isReadOnly } = props;
  const isString = (item) => typeof item === "string" || item instanceof String;
  const isOpen = isString(currentFunction);
  const [crumbs, setCrumbs] = useState([{ label: currentFunction }]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (crumbs[0].label !== currentFunction) {
      setCrumbs([{ label: currentFunction }]);
    }
  }, [currentFunction]);

  function updateCrumbs(index) {
    //makes slice of original crumbs ending at the index
    //only acts if the crumb index isnt the last crumb
    const newCrumbs = index !== crumbs.length - 1 && crumbs.slice(0, index + 1);
    newCrumbs && setCrumbs(newCrumbs);
  }

  function handleProfileChange(user) {
    //add a new crumb  basically
    if (user) {
      setCrumbs([...crumbs, { user, label: "Profile" }]);
    } else {
      crumbs.splice(
        crumbs.indexOf(crumbs.find((item) => item.label === "Profile")),
        1
      );
      setCrumbs(crumbs);
    }
  }

  function readOnlyWarning(alert) {
    setAlert(
      <Alert severity="error">
        Because this is an older schedule you cannot edit this schedule
      </Alert>
    );
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  }

  return (
    <div className="drawer">
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          left: 0,
          bottom: 0,
          background: "blue",
        }}
      >
        Consequat occaecat irure pariatur occaecat sint reprehenderit excepteur
        sint. Dolor duis mollit incididunt adipisicing duis laboris incididunt
        ut labore do deserunt. Minim voluptate nulla cupidatat consectetur
        cillum labore incididunt ad excepteur tempor aute in. Aute amet magna
        Lorem dolor officia aliquip nisi. Veniam incididunt velit velit in
        ullamco magna elit enim et incididunt irure. Lorem irure culpa dolor in
        commodo nulla.
      </div>
      {/**    <StyledCloseButton onClick={() => changeCurrentFunction(null)}>
        <img alt="Close" src={closeIcon} />
      </StyledCloseButton>
      <Notification message={alert} />
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
          readOnlyWarning={readOnlyWarning}
          isReadOnly={isReadOnly}
        />
        <SavePrompt
          name="save"
          currentFunction={currentFunction}
          isReadOnly={isReadOnly}
          readOnlyWarning={readOnlyWarning}
        />
      </div>*/}
      {/**
         <MyBreadcrumbs updateCrumbs={updateCrumbs} crumbs={crumbs} />
 */}
    </div>
  );
}

export default TheDrawer;
