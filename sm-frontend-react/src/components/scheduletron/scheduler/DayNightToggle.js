import React, { Component } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import dayIcon from "../../../assets/images/Day Icon.svg";
import nightIcon from "../../../assets/images/Night Icon.svg";
import { withStyles } from "@material-ui/core";

const styles = () => ({
  toggleGroup: {
    background: "red",
  },
});

class DayNightToggle extends Component {
  state = { value: "day" };
  handleValue = (e, newValue) => this.setState({ value: newValue });

  render() {
    const { value } = this.state;
    const { classes } = this.props;
    return (
      <ToggleButtonGroup value={value} onChange={this.handleValue}>
        <ToggleButton value="day" aria-label="left aligned">
          <img style={{ opacity: value === "day" ? 1 : 0.5 }} src={dayIcon} />
        </ToggleButton>
        <ToggleButton value="night" aria-label="centered">
          <img
            style={{ opacity: value === "night" ? 1 : 0.5 }}
            src={nightIcon}
          />
        </ToggleButton>
      </ToggleButtonGroup>
    );
  }
}

export default withStyles(styles)(DayNightToggle);
