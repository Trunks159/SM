import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import Header from "./Header.js";
import WorkerList from "./WorkerList";

const styles = () => ({
  main: {
    background: "#F0F0F0",
    width: "100%",
    margin: 12,
    marginLeft: 0,
    borderRadius: "7px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  workerList: {
    background: "#D2DDDA",
    height: "100%",
    position: "relative",
    overflowY: "auto",
    display: "flex",
    flexWrap: "wrap",
    width: "90%",
    alignItems: "center",
  },
});

class ShiftEditor extends Component {
  state = {
    day: null,
  };

  componentDidMount = () => {
    fetch(`/get_day/${this.props.date}`)
      .then((response) => response.json())
      .then((day) => {
        this.setState({ day: day });
      });
  };

  render() {
    const { classes } = this.props;
    console.log("The day: ", this.state.day);
    return this.state.day ? (
      <div className={classes.main}>
        <Header />
        <WorkerList day={this.state.day} />
      </div>
    ) : null;
  }
}

export default withStyles(styles)(ShiftEditor);
