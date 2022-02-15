import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Button } from "@material-ui/core";
import MySlider from "../../mySlider/MySlider";
import profileIcon from "../../../assets/images/Large Profile Icon.svg";
import removeIcon from "../../../assets/images/Remove Icon.svg";

const useStyles = makeStyles({
  paper: {
    width: 237,
    height: 78,
    position: "relative",
    borderRadius: 7,
  },
  slider: {
    position: "absolute",
    bottom: "-10%",
    left: "50%",
    transform: "translate(-50%, 0%)",
  },
  profileIcon: {
    height: "100%",
    marginLeft: 12,
  },
  removeIcon: {
    position: "absolute",
    height: "32%",
    top: 5,
    right: 5,
  },
  name: {
    position: "absolute",
    margin: 0,
    top: "18%",
    left: "50%",
    transform: "translate(-50%, 0%)",
    padding: 0,
    fontSize: 22,
  },
  position: {
    position: "absolute",
    fontSize: 14,
    color: "#00BCFF",
    margin: 3,
  },
});

const ProfileTag = ({
  id,
  firstName,
  position,
  startTime,
  endTime,
  handleSlider,
  handleClose,
}) => {
  const classes = useStyles();
  console.log("The id: ", id);
  return (
    <Paper
      elevation={3}
      className={classes.paper}
      style={position === "manager" ? { border: "1px solid #00BCFF" } : null}
    >
      {/*<ProfileIcon className={classes.profileIcon}/>*/}
      <Button
        className={classes.removeIcon}
        onClick={() => handleClose(id)}
        endIcon={<img src={removeIcon} />}
      ></Button>

      <p className={classes.name}>{firstName}</p>
      <p className={classes.position}>
        {position === "manager" ? position.charAt(0).toUpperCase() : null}
      </p>

      <img className={classes.profileIcon} src={profileIcon} />
      <div className={classes.slider}>
        <MySlider
          id={id}
          handleSlider={handleSlider}
          value={[startTime, endTime]}
        />
      </div>
    </Paper>
  );
};

export default ProfileTag;
