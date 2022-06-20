import React, { Component } from "react";
import dayIcon from "../../../../assets/images/Day Icon.svg";
import nightIcon from "../../../../assets/images/Night Icon.svg";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
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

export default function ToggleButtons({ isDesktop }) {
  const [value, setValue] = React.useState("day");
  const classes = useStyles();
  const handleToggle = (event, newValue) => newValue && setValue(newValue);

  return (
    <ToggleButtonGroup
      className={classes.group}
      value={value}
      exclusive
      onChange={handleToggle}
    >
      <ToggleButton className={classes.button} value="day">
        <img style={{ paddingTop: 6 }} className={classes.img} src={dayIcon} />
      </ToggleButton>
      <ToggleButton
        className={classes.button}
        value="night"
        style={{ paddingBottom: 1 }}
      >
        <img src={nightIcon} />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
