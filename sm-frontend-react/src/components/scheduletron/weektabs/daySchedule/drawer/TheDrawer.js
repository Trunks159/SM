import { Collapse, Divider } from "@mui/material";
import { Button } from "@material-ui/core";
import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core";
import AddPrompt from "./AddPrompt";
import SavePrompt from "./SavePrompt";
import TeamPrompt from "./TeamPrompt";
import "./thedrawer.css";
import Functions from "../../functions/Functions";
import closeIcon from "./assets/Close Icon.svg";

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
          <img alt="Close" src={closeIcon} />
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
