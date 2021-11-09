import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";
import MySlider from "../../mySlider/MySlider";
import { ReactComponent as ProfileIcon } from "../../../assets/images/Large Profile Icon.svg";
import { ReactComponent as RemoveIcon } from "../../../assets/images/Remove Icon.svg";

const useStyles = makeStyles({
  paper: {
    width : 226,
    position: "relative",
    borderRadius: 7,
  },
  slider: {
    width: '60%',
    position: "absolute",
    bottom: "-20px",
    left: "50px",
    color: "#328F83",
    "& .MuiSlider-thumb": {
      backgroundColor: "#328F83",
      width: 12,
      height: 12,
      top: 13,
    },
    "& .MuiSlider-mark": {
      height: 0,
    },
    "& .MuiSlider-track": {
      height: 3,
    },
    "& .MuiSlider-valueLabel": {
      fontSize: 10,
      backgroundColor: "unset",
      "&:before": {
        display: "none",
      },
      "& *": {
        background: "transparent",
        color: "black",
      },
    },
    "& .MuiSlider-markLabel": {
      top: -2,
      fontSize: 10,
    },
  },
  profileIcon: {
    marginLeft: 12,
    marginBottom:0,
    height: "100%",
  },
  removeIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  name: {
    position: "absolute",
    top: "12%",
    left:'50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    fontSize: 20,
  },
  position: {
    position: "absolute",
    top: "46%",
    fontSize: 6,
    color: "#00BCFF",
  },
});

const ProfileTag = ({
  id,
  firstName,
  position,
  startTime,
  endTime,
  handleSlider,
}) => {
  const classes = useStyles();

  return (
    <Paper
      elevation={3}
      className={classes.paper}
      style={position === "manager" ? { border: "2px solid #328F83" } : null}
    >
      <ProfileIcon className={classes.profileIcon}/>
      <RemoveIcon className = {classes.removeIcon}/>
      <p className={classes.name}>{firstName}</p>
      <p className={classes.position}>
        {position.charAt(0).toUpperCase() + position.slice(1)}
      </p>

      <MySlider
        id={id}
        handleSlider={handleSlider}
        value={[startTime, endTime]}
        classes={classes}
      />
    </Paper>
  );
};

export default ProfileTag;
