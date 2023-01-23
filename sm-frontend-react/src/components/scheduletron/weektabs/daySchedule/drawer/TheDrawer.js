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
  let date = moment(props.date);
  const isOpen = isString(currentFunction);
  const [crumbs, setCrumbs] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (currentFunction) {
      setCrumbs([currentFunction]);
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
    setProfile(user);
    if (user) {
      setCrumbs([...crumbs, "Profile"]);
    } else {
      crumbs.splice(
        crumbs.indexOf(crumbs.find((item) => (item = "Profile"))),
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
