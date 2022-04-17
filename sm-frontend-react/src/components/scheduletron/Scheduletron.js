import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import Scheduler from "./Scheduler";

const styles = () => ({
  main: {
    height: "100%",
    display: "flex",
  },
});

class Scheduletron extends Component {
  state = {
    selected : null,
  };

  handleSelect = (week) => {
    console.log('the selected', week)
    if (this.state.selected === week) {
      this.setState({ selected: null });
    } else {
      this.setState({ selected: week });
    }
  };

  render() {
    const { classes, match } = this.props;
    let { path } = match;
    return (
      <div className={classes.main}>
        <Nav path={path} />
        <Switch>
          <Route exact path={"/scheduletron"}>
            <Home handleSelect = {this.handleSelect} selected = {this.state.selected}/>
          </Route>
          <Route path={"/scheduletron/:date"}>
            <Scheduler day = {this.state.selected} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(Scheduletron));
