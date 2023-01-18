import React, { useState, useEffect } from "react";
import { Collapse } from "@mui/material";
import { Button, Breadcrumbs } from "@material-ui/core";
import moment from "moment";
import HelpPrompt from "./HelpPrompt/HelpPrompt";
import AddPrompt from "./AddPrompt";
import SavePrompt from "./SavePrompt";
import TeamPrompt from "./TeamPrompt";
import "./thedrawer.css";
import Functions from "../../functions/Functions";
import closeIcon from "./assets/Close Icon.svg";
import styled from "@emotion/styled";
import HeaderButton from "./HeaderButton";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { grey } from "@mui/material/colors";

const StyledCloseButton = styled(Button)({
  minWidth: 0,
  color: "white",
  position: "absolute",
  top: 0,
  right: 0,
  "&:hover": {
    background: "rgba(255,255,255,.25)",
  },
  padding: 10,
  margin: 10,
  height: 32,
  width: 32,
  borderRadius: 16,
  background: "rgba(255,255,255,.09)",
});

function TheDrawer(props) {
  const { currentFunction, changeCurrentFunction } = props;
  const isString = (item) => typeof item === "string" || item instanceof String;
  let date = moment(props.date);
  const isOpen = isString(currentFunction);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const bc = [<HeaderButton text={currentFunction} withIcon isActive />];
    setBreadcrumbs(bc);
  }, [currentFunction]);
  return (
    <Collapse in={isOpen}>
      <div className="drawer">
        <StyledCloseButton onClick={() => changeCurrentFunction(null)}>
          <img alt="Close" src={closeIcon} />
        </StyledCloseButton>
        <Breadcrumbs
          separator={
            <NavigateNextIcon style={{ color: grey[50] }} fontSize="small" />
          }
          style = {{marginLeft : 30}}
        >
          {breadcrumbs}
        </Breadcrumbs>


        <div className="drawer-content">
          <HelpPrompt name="help" currentFunction={currentFunction} />
          <TeamPrompt
            name="team"
            currentFunction={currentFunction}
            setBreadcrumbs={setBreadcrumbs}
          />
          <AddPrompt
            name="add"
            currentFunction={currentFunction}
            theDate={date}
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
