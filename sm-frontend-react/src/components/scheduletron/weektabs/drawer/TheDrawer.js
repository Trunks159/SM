import { Tabs, Tab, Collapse, Button, Divider } from "@mui/material";
import React, { Component } from "react";
import editIcon from "./assets/Edit Icon.svg";
import addIcon from "./assets/Add Icon.svg";
import saveIcon from "./assets/Save Icon.svg";
import moment from "moment";
import { withStyles } from "@material-ui/core";
import AddPrompt from "./AddPrompt";
import SavePrompt from "./SavePrompt";
import "./thedrawer.css";
import EditPrompt from "./EditPrompt";

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
    width: 190,
    "& .MuiTabs-indicator": {
      background: "white",
    },
    "& .Mui-selected": {
      opacity: 1,
      color: "white",
    },
    "& .MuiTabs-flexContainer": {
      justifyContent: "center",
    },
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
  },
});

class TheDrawer extends Component {
  state = {
    open: true,
    currentTab: 0,
  };

  changeTab = (e, newTab) => {
    this.setState({
      currentTab: newTab,
    });
  };

  render() {
    const { teamMembers, classes } = this.props;
    const { currentTab } = this.state;
    const date = moment(this.props.date);
    console.log("Currenttabb: ", currentTab);
    return (
      <Collapse in={this.state.open}>
        <div
          className="drawer"
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            right: 0,
            left: 70,
            background: "rgba(0,0,0,.75)",
            color: "white",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              color: "rgb(235, 235, 235)",
              fontSize: 33,
              margin: "25px 10px",
              fontWeight: 200,
            }}
          >
            {date.format("dddd")} {`${date.month() + 1}/${date.date()}`}
          </h1>
          <Divider
            style={{ height: 0.5, width: "100%", background: "#707070" }}
          />
          <Tabs
            className={classes.tabs}
            onChange={this.changeTab}
            value={currentTab}
          >
            <Tab
              className={classes.tab}
              value={0}
              label="Edit"
              icon={<img src={editIcon} />}
            />
            <Tab
              className={classes.tab}
              value={1}
              label="Add"
              icon={<img src={addIcon} />}
            />
            <Tab
              className={classes.tab}
              value={2}
              label="Save"
              icon={<img src={saveIcon} />}
            />
          </Tabs>
          <div
            style={{
              border: ".5px solid #BFBFBF",
              borderRadius: 4,
              margin: "0px 10px",
              height: 500,
              overflowY: "auto",
              padding: 5,
            }}
          >
            <EditPrompt index={0} currentTab={currentTab} />
            <AddPrompt
              teamMembers={teamMembers}
              index={1}
              currentTab={currentTab}
            />
            <SavePrompt index={2} currentTab={currentTab} />
          </div>
        </div>
      </Collapse>
    );
  }
}

export default withStyles(styles)(TheDrawer);
