import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import DayBtn from "./DayBtn";

const styles = () => ({
  mounted: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#E1E9EE",
    justifyContent: "space-evenly",
    width: "auto",
    padding: "0px 15px",
    transition: "width 3s ease-in",
  },
  unmounted: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#E1E9EE",
    justifyContent: "space-evenly",
    width: "1px",
    minWidth: "1px",
    overflowX: "hidden",
    transition: "width .5s ease-in",
  },
});

class WeekBar extends Component {
  state = {
    mounted: {},
  };

  componentDidMount = () => {
    this.setState({ mounted: true });
  };

  render() {
    const { week, classes } = this.props;
    return (
      <div className={this.state.mounted ? classes.mounted : classes.unmounted}>
        {week.map(({ weekday, staffing, month, day, id }) => (
          <DayBtn
            weekday={weekday}
            completion={Math.round(
              (staffing.actual / staffing.projected) * 100
            )}
            date={`${month}/${day}`}
            id={id}
          />
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(WeekBar);
