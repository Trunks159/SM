import React, { useState, useEffect } from "react";
import { Button, Alert, Collapse } from "@mui/material";
import styled from "@emotion/styled";
import closeIcon from "./assets/Close Icon.svg";
import Prompt from "./prompts/Prompt";
import MyBreadcrumbs from "./MyBreadCrumbs";
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
  padding: 15,
  margin: 20,
  height: 32,
  width: 32,
  borderRadius: 16,
  background: "rgba(255,255,255,.1)",
});

function TheDrawer(props) {
  const { currentFunction, changeCurrentFunction, isReadOnly, isDesktop } =
    props;
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
    <div
      //if on mobile and tabs are on show, if on mobile and
      //tabs are off dont , if desktop always show
      //collapse renders for some reason when not in position absolute
      className={"drawer-container"}
    >
      <Collapse
        in={currentFunction}
        orientation={isDesktop ? "horizontal" : "vertical"}
      >
        <div className="drawer">
          <div>
            <MyBreadcrumbs updateCrumbs={updateCrumbs} crumbs={crumbs} />
            <StyledCloseButton onClick={() => changeCurrentFunction(null)}>
              <img src={closeIcon} />
            </StyledCloseButton>
          </div>
          <Notification message={alert} />
          <Prompt
            profile={((crumbs) => {
              const profileCrumb = crumbs.find(
                (crumb) => crumb.label === "Profile"
              );
              return profileCrumb && profileCrumb.user;
            })(crumbs)}
            currentFunction={currentFunction}
            handleProfileChange={handleProfileChange}
            readOnlyWarning={readOnlyWarning}
            isReadOnly={isReadOnly}
          />
        </div>
      </Collapse>
    </div>
  );
}

export default TheDrawer;
