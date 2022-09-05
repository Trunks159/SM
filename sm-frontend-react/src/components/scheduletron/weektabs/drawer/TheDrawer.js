import { Tabs, Tab, Collapse, Button , Divider} from "@mui/material";
import React, { Component } from "react";
import editIcon from "./assets/Edit Icon.svg";
import addIcon from "./assets/Add Icon.svg";
import saveIcon from "./assets/Save Icon.svg";
import moment from "moment";
import { withStyles } from "@material-ui/core";
import AddPrompt from "./AddPrompt";
import SavePrompt from "./SavePrompt";
import './thedrawer.css'
import EditPrompt from "./EditPrompt";

const styles = () => ({
  tab: {
    textTransform: "none",
    transitionDuration: ".25s",
    margin: "0px 12.5px",
    minWidth: 150,
    padding: "0px 20px",
    opacity: 0.75,
    minWidth : 0,
    fontSize : 14,
    height : 70,
    width : 70,
    fontWeight : '400',
    '& .MuiTab-iconWrapper':{
      marginBottom : 8
    },
  },
  tabs: {
    "& .MuiTabs-indicator": {
      background: "white",
    },
    "& .Mui-selected": {
      opacity: 1,
      color: "white",
    },
    "& .MuiTabs-flexContainer": {
      justifyContent : 'center',
    },
    background : 'blue', 
    width : 'min-content', 
    marginLeft : 'auto',
    marginRight : 'auto', 
    marginTop : 20
  },
});

class TheDrawer extends Component {
  state = {
    open: false,
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
            display : 'flex',
            flexDirection : 'column'
          }}
        >
          <h1>
            {date.format("dddd")} {`${date.month() + 1}/${date.date()}`}
          </h1>
          <Divider style = {{height : .5, width : '100%', background : '#707070'}} />
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
          <div style={{ border: ".5px solid #BFBFBF", margin: "0px 15px",height : 413, overflowY : 'auto' }}>
            <AddPrompt
              teamMembers={teamMembers}
              index={1}
              currentTab={currentTab}
            />
            <SavePrompt index={2} currentTab={currentTab} />
            <EditPrompt/>
          </div>
        </div>
      </Collapse>
    );
  }
}

export default withStyles(styles)(TheDrawer);
