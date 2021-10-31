import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";
import MySlider from "../../mySlider/MySlider";

const useStyles = makeStyles({
  paper: {
    minWidth: "300px",
    minHeight: "100px",
    position: "relative",
    borderRadius :7,
  },
  slider: {
    width: "200px",
    position: "absolute",
    bottom: "-20px",
    left: "50px",
    color: "#328F83",
    "& .MuiSlider-thumb": {
      backgroundColor: "#328F83",
      width:20,
      height:20,
      top :9.5,
      left:'100px',
    },
    "& .MuiSlider-mark": {
      height: 0,
    },
    "& .MuiSlider-track": {
        height: 3,
      },
    "& .MuiSlider-valueLabel": {
      fontSize: 10,
      backgroundColor :'unset',
      '&:before': {
        display: 'none',
      },
      '& *': {
        background: 'transparent',
        color:'black',
      },
    },
    "& .MuiSlider-markLabel": {
        top:-9,
        fontSize:10,
    },
  },
  profileIcon: {
    marginLeft: 12,
    height: "100%",
  },
  removeIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  name: {
    position: "absolute",
    top: '15%',
    left: '43%',
    margin:0,
    padding: 0,
    textAlign: "center",
    fontSize: 25,
  },
  position: {
    position: "absolute",
    top: "46%",
    left: '45%',
    margin: "0",
    padding: "0",
    textAlign: "center",
    fontSize: 10,
    color : '#00BCFF',
  },
});

const ProfileTag = ({
  id,
  firstName,
  position,
  startTime,
  endTime,
  imgSrc,
  handleSlider,
}) => {
  const classes = useStyles();

  return (
    <Paper
      elevation={3}
      className={classes.paper}
      style={position === "manager" ? { border: "2px solid #328F83" } : null}
    >
      <img
        src={imgSrc + "/Large Profile Icon.svg"}
        className={classes.profileIcon}
      />
      <img src={imgSrc + "/Remove Icon.svg"} className={classes.removeIcon} />
      <p className={classes.name}>{firstName}</p>
      <p className={classes.position}>{position.charAt(0).toUpperCase() + position.slice(1) }</p>

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
