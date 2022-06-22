import React, { Component } from "react";
import dayIcon from "../../../../assets/images/Day Icon.svg";
import nightIcon from "../../../../assets/images/Night Icon.svg";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { withStyles } from "@material-ui/core";

const styles = () => ({
  group: {
    display: "flex",
    height: 40,
    width: 100,
    marginLeft: "auto",
  },
  button: {
    width: "50%",
    borderRadius: 7,
    backgroundColor: "#C4C4C4",

    "&:hover": {
      backgroundColor: "#C4C4C4",
      opacity: 0.8,
    },
    "& img": {
      opacity: 0.5,
    },
    "&.Mui-selected": {
      "&:hover": {
        backgroundColor: "#275C78",
        opacity: 0.8,
      },
      backgroundColor: "#275C78",
      "& img": {
        opacity: 1,
      },
    },
  },
});

class ToggleButtons extends Component {
  state = {};
  componentDidMount = () => {
    this.props.handleShiftFilter({ day: true, night :false });
  };
  render() {
    const { isDesktop, handleShiftFilter, shiftFilter, classes } = this.props;
    return (
      <ToggleButtonGroup
        className={classes.group}
        value={shiftFilter.day ? "day" : "night"}
        exclusive
        onChange={(e, newValue) =>
          newValue && handleShiftFilter({
            day: newValue === "day",
            night: newValue === "night",
          })
        }
      >
        <ToggleButton className={classes.button} value={"day"}>
          <img
            style={{ paddingTop: 6 }}
            className={classes.img}
            src={dayIcon}
          />
        </ToggleButton>
        <ToggleButton
          className={classes.button}
          value={"night"}
          style={{ paddingBottom: 1 }}
        >
          <img src={nightIcon} />
        </ToggleButton>
      </ToggleButtonGroup>
    );
  }
}

export default withStyles(styles)(ToggleButtons);

//  const handleToggle = (event, newValue) => {
//newValue && setValue(newValue);
