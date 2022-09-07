import React, { Component } from "react";
import greyAddIcon from "./assets/Add Icon Grey.svg";
import greySaveIcon from "./assets/Save Icon Grey.svg";
import greyEditIcon from "./assets/Edit Icon Grey.svg";
import editIcon from "./assets/Edit Icon.svg";
import addIcon from "./assets/Add Icon.svg";
import saveIcon from "./assets/Save Icon.svg";
import { withStyles } from "@material-ui/core";
import { Tabs, Tab, Collapse, Button, Divider } from "@mui/material";

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
});

class Functions extends Component {
  render() {
    const { classes, currentFunction } = this.props;
    const isOpen = Number.isInteger(currentFunction);
    return (
      <Tabs
        className={classes.tabs}
        onChange={this.props.changeCurrentFunction}
        value={currentFunction}
        orientation={"vertical"}
      >
        <Tab
          style={{ marginTop: "auto" }}
          className={classes.tab}
          value={0}
          label="Edit"
          icon={<img src={isOpen ? editIcon : greyEditIcon} />}
        />
        <Tab
          className={classes.tab}
          value={1}
          label="Add"
          icon={<img src={isOpen ? addIcon : greyAddIcon} />}
        />
        <Tab
          className={classes.tab}
          value={2}
          label="Save"
          icon={<img src={isOpen ? saveIcon : greySaveIcon} />}
        />
      </Tabs>
    );
  }
}

export default withStyles(styles)(Functions);
