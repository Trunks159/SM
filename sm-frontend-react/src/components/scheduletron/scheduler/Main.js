import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import vsIcon from "../../../assets/images/Visualizer Icon.svg";
import editorIcon from "../../../assets/images/Editor Icon.svg";
const styles = () => ({
  main: {
    display: "flex",
    background: "#F6F6F6",
    margin: 20,
  },
  nav: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    stuff: 1,
  },
});

class Main extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <div className={classes.nav}>
          <img src={vsIcon} />
          <img src={editorIcon} />
        </div>
        <div className={classes.content}>Yo</div>
      </div>
    );
  }
}

export default withStyles(styles)(Main);
