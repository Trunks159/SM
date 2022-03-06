import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Button } from "@material-ui/core";
import MySlider from "../../mySlider/MySlider";
import profileIcon from "../../../assets/images/Large Profile Icon.svg";
import removeIcon from "../../../assets/images/Remove Icon.svg";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ProfileInfo from "./ProfileInfo";

const useStyles = makeStyles({
  main: {
    minWidth: 200,
    minHeight: 80,
  },
  paper: {
    width: "100%",
    minHeight: 70,
    position: "relative",
    borderRadius: "7px 7px 0px 0px",
  },
  slider: {
    position: "absolute",
    bottom:'18%',
    left: "50%",
    width :'60%',
    transform: "translate(-50%, 0%)",
  },
  profileIcon: {
    position: "absolute",
    height: "100%",
    marginLeft: 12,
    marginBottom: 0,
  },
  removeIcon: {
    position: "absolute",
    top: 0,
    right: -10,
    
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
    <div className={classes.main}>
      <Paper
        elevation={2}
        className={classes.paper}
        /*style={position === "manager" ? { border: "1px solid #00BCFF" } : null}*/
      >
        {/*<ProfileIcon className={classes.profileIcon}/>*/}
        <Button
          className={classes.removeIcon}
          onClick={() => handleClose(id)}
          endIcon={<img src={removeIcon} />}
        ></Button>
        <img className={classes.profileIcon} src={profileIcon} />
        <p className={classes.name}>{firstName}</p>
        <p className={classes.position}>
          {position === "manager" ? position.charAt(0).toUpperCase() : null}
        </p>
          <MySlider
            classes = {classes.slider} 
            id={id}
            handleSlider={handleSlider}
            value={[startTime, endTime]}
          />
      </Paper>
      <ProfileInfo weekday={weekday} id={id} />
    </div>
  );
};

export default ProfileTag;
