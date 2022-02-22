import React, { Component } from "react";
import {withStyles } from "@material-ui/core";
import Actions from "./Actions";
import Header from "./Header.js";
import ProfileTag from "./ProfileTag";


const styles = () => ({
  main: {
    background: "#F0F0F0",
    width: "100%",
    margin: 12,
    marginLeft : 0,
    borderRadius: "7px",
    display: "flex",
    flexDirection: "column",
    alignItems : 'center',
  },
  workerList: {
    background: "#D2DDDA",
    height : '100%',
    position: "relative",
    overflowY: "auto",
    display : 'flex',
    flexWrap : 'wrap',
    background : 'red',
    width :'90%',
  },
});

class ShiftEditor extends Component {
  state = {};

  componentDidMount = () => {};

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <Header />
        <div className={classes.workerList}>
          
          <ProfileTag
            weekday={'monday'}
            id = {1}
            firstName = 'jordan'
            position = 'manager'
          />
          <Actions />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ShiftEditor);
