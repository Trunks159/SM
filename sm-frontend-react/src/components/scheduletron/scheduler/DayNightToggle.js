import React, { Component } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import dayIcon from "../../../assets/images/Day Icon.svg";
import nightIcon from "../../../assets/images/Night Icon.svg";
import { withStyles } from "@material-ui/core";

const styles = () => ({
  toggleGroup: {
    background: "red",
    width: 100,
    height: 35,
    display: "flex",
    justifyContent: "space-evenly",
    marginLeft: "auto",
  },
  btn: {
    flex: 1,
    "& .MuiButtonBase-root": {
      background: "orange",
    },
  },
});

class DayNightToggle extends Component {
  state = { value: "day" };
  handleValue = (e, newValue) => {
    console.log("Newvalue: ", e.target.value);
    this.setState({ value: newValue });
  };

  render() {
    const { value } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.toggleGroup}>
        <button>
          <img style={{ opacity: value === "day" ? 1 : 0.5 }} src={dayIcon} />
        </button>

        <button>
          <img
            style={{ opacity: value === "night" ? 1 : 0.5 }}
            src={nightIcon}
          />
        </button>
      </div>
    );
  }
}

export default withStyles(styles)(DayNightToggle);
