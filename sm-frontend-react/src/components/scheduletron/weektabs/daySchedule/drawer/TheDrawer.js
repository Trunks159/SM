import { Collapse, Divider } from "@mui/material";
import { Button } from "@material-ui/core";
import React, { useState } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core";
import AddPrompt from "./AddPrompt";
import SavePrompt from "./SavePrompt";
import TeamPrompt from "./TeamPrompt";
import "./thedrawer.css";
import Functions from "../../functions/Functions";

const useStyles = makeStyles({
  tab: {
    textTransform: "none",
    transitionDuration: ".25s",
    minWidth: 0,
    padding: "0px 20px",
    opacity: 0.75,
    minWidth: 0,
    fontSize: 12,
    fontWeight: "400",
    "& .MuiTab-iconWrapper": {
      marginBottom: 8,
    },
  },
  tabs: {
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
  },
  closeBtn: {
    color: "white",
    position: "absolute",
    top: 10,
    right: 10,
    "&:hover": {
      opacity: 0.75,
    },
  },
});

function TheDrawer(props) {
  const { currentFunction, changeCurrentFunction } = props;
  let date = moment(props.date);
  const isOpen = Number.isInteger(currentFunction);
  const classes = useStyles();
  return (
    <Collapse in={isOpen}>
      <div className="drawer">
        <Button
          onClick={() => changeCurrentFunction(null)}
          className={classes.closeBtn}
        >
          Close
        </Button>
        <div className="drawer-header">
          <h1>
            {date.format("dddd")} {`${date.month() + 1}/${date.date()}`}
          </h1>
          <Divider
            style={{ height: 0.5, width: "100%", background: "#707070" }}
          />
        </div>

        <div className="drawer-content">
          <TeamPrompt index={0} currentFunction={currentFunction} />
          <AddPrompt
            index={1}
            currentFunction={currentFunction}
            theDate={date}
          />
          <SavePrompt index={2} currentFunction={currentFunction} />
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
