import React, { Component } from "react";
import dayIcon from "../../../assets/images/Day Icon.svg";
import nightIcon from "../../../assets/images/Night Icon.svg";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  group: {
    display: "flex",
    height: 40,
    width: 100,
    marginLeft : 'auto',
  },
  button: {
    width: "50%",
    borderRadius: 7,
    backgroundColor: "#C4C4C4",

    '&:hover':{
        backgroundColor : '#C4C4C4',
        opacity : .8,
    },
    "& img": {
      opacity: 0.5,
    },
    "&.Mui-selected": {
      '&:hover':{
        backgroundColor : '#275C78',
        opacity : .8,
    },
      backgroundColor: "#275C78",
      "& img": {
        opacity: 1,
      },

    },
  },
});

export default function ToggleButtons() {
  const [alignment, setAlignment] = React.useState("left");
  const classes = useStyles();
  const handleAlignment = (event, newAlignment) => {
    console.log('NewAlignment: ', newAlignment)
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      className={classes.group}
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton
        className={classes.button}
        value="left"
        aria-label="left aligned"
      >
        <img style={{paddingTop : 6}} className={classes.img} src={dayIcon} />
      </ToggleButton>
      <ToggleButton
        className={classes.button}
        value="center"
        aria-label="centered"
        style={{ paddingBottom: 1 }}
      >
        <img src={nightIcon} />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
