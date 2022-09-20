import { Collapse, Button, Divider } from "@mui/material";
import React, { Component } from "react";
import moment from "moment";
import { withStyles } from "@material-ui/core";
import AddPrompt from "./AddPrompt";
import SavePrompt from "./SavePrompt";
import EditPrompt from "./EditPrompt";
import "./thedrawer.css";
import Functions from "../functions/Functions";

const styles = () => ({
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

class TheDrawer extends Component {
  state = {
    currentTab: 0,
  };

  render() {
    const { teamMembers, classes, currentFunction } = this.props;
    const date = moment(this.props.date);
    const isOpen = Number.isInteger(currentFunction);
    return (
      <Collapse in={isOpen}>
        <div className="drawer">
          <Button
            onClick={(e) => this.props.changeCurrentFunction(e, null)}
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
            <EditPrompt index={0} currentFunction={currentFunction} />
            <AddPrompt
              teamMembers={teamMembers}
              index={1}
              currentFunction={currentFunction}
            />
            <SavePrompt index={2} currentFunction={currentFunction} />
          </div>
          <Functions
            changeCurrentFunction={this.props.changeCurrentFunction}
            currentFunction={currentFunction}
          />
        </div>
      </Collapse>
    );
  }
}

export default withStyles(styles)(TheDrawer);
