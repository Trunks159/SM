import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import SelectWeek from "./SelectWeek";
import WeekSchedule from "./WeekSchedule";

const styles = () => ({
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    minWidth: 20,
  },
});

class WeekView extends Component {
  state = {};
  render() {
    const { classes, colorPalette, url} = this.props;
    return (
      <div className={classes.main}>
        <SelectWeek />
        <WeekSchedule colorPalette={colorPalette} url = {url} />
      </div>
    );
  }
}

export default withStyles(styles)(WeekView);
