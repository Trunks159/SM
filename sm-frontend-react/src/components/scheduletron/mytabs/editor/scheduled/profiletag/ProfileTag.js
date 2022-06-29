import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Button } from "@material-ui/core";
import MySlider from "./MySlider";
import profileIcon from "./assets/Large Profile Icon.svg";
import removeIcon from "./assets/Remove Icon.svg";
import ProfileInfo from "./ProfileInfo";

const useStyles = makeStyles({
  paper: {
    width: 237,
    minHeight: 87,
    position: "relative",
    borderRadius:7,
  },
  slider: {
    position: "absolute",
    bottom: "18%",
    left: "50%",
    width: "60%",
    transform: "translate(-50%, 0%)",
  },
  profileIcon: {
    position: "absolute",
    height: "100%",
    marginLeft: 12,
  },
  removeIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    background : 'red',
    minWidth : 0,
    padding : 0,
  },
  name: {
    position: "absolute",
    margin: 0,
    top: "18%",
    left: "50%",
    transform: "translate(-50%, 0%)",
    padding: 0,
    fontSize: 20,
    textTransform: "capitalize",
  },
  position: {
    position: "absolute",
    fontSize: 14,
    color: "#00BCFF",
    margin: 3,
  },
});

const ProfileTag = ({
  weekday,
  id,
  firstName,
  position,
  startTime,
  endTime,
  handleSlider,
  handleClose,
}) => {
  const classes = useStyles();
  console.log("The id: ", weekday);
  return (
      <Paper className={classes.paper}>
        <Button
          className={classes.removeIcon}
          onClick={() => handleClose(id)}
          endIcon={<img src={removeIcon} />}
       />
        <img className={classes.profileIcon} src={profileIcon} />
        <p className={classes.name}>{firstName}</p>
        <p className={classes.position}>
          {position === "manager" ? position.charAt(0).toUpperCase() : null}
        </p>
        <MySlider
          classes={classes.slider}
          id={id}
          handleSlider={handleSlider}
          value={[startTime, endTime]}
        />
        <ProfileInfo weekday={weekday} id={id} />
      </Paper>
      

  );
};

export default ProfileTag;
