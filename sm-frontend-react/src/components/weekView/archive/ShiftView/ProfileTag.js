import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Button } from "@material-ui/core";
import MySlider from "../../mySlider/MySlider";
import profileIcon from "../../../assets/images/Large Profile Icon.svg";
import removeIcon from "../../../assets/images/Remove Icon.svg";
import expandIcon from "../../../assets/images/Expand Icon.svg";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ProfileInfo from "./ProfileInfo";

const useStyles = makeStyles({

  paper: {
    minHeight: 78,
    position: "relative",
    borderRadius: "7px 7px 0px 0px",
  },
  slider: {
    position: "absolute",
    bottom: "-10%",
    left: "50%",
    transform: "translate(-50%, 0%)",
  },
  profileIcon: {
    position: "absolute",
    height: 77,
    marginLeft: 12,
    marginBottom: 0,
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
    <div  >
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
      <Accordion
        disable
        disableGutters
        className={classes.accordion}
        sx={{ background: "#F0F0F0",  }}
      >
        <AccordionSummary
          expandIcon={<img src={expandIcon} />}
          sx={{ minHeight: "18px", height: "18px" }}
        >
          <p style={{ fontSize: 8, marginLeft: "auto", marginRight: "4px" }}>
            User Info
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <ProfileInfo id={id} weekday={weekday} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ProfileTag;
