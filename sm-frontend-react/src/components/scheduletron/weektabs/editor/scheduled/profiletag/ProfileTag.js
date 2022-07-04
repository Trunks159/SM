import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Button } from "@material-ui/core";
import MySlider from "./MySlider";
import profileIcon from "./assets/Large Profile Icon.svg";
import removeIcon from "./assets/Remove Icon.svg";

import ProfileInfo from "./ProfileInfo";
import { timeToValue } from "../../../../../TimeFunctions";
import "./profiletag.css";

const useStyles = makeStyles({
  deleteBtn: {
    position: "absolute",
    top: 0,
    right: 0,
    minWidth: 0,
  },
  slider: {
    position: "absolute",
    bottom: "18%",
    left: "50%",
    width: "60%",
    transform: "translate(-50%, 0%)",
  },
});

const ProfileTag = ({
  wbId,
  dayId,
  user,
  startTime,
  endTime,
  handleSlider,
  removeFromSchedule,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();
  const { firstName, lastName, position } = user;
  return (
    <Paper className="profile-tag">
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          width: 237,
          height: 87,
        }}
      >
        <Button
          className={classes.deleteBtn}
          onClick={() => {
            return removeFromSchedule(wbId);
          }}
        >
          <img src={removeIcon} />
        </Button>
        <img className="profile-icon" src={profileIcon} />
        <p className="profile-tag-name">
          {firstName} {lastName.charAt(0)}
        </p>
        {position === "manager" && (
          <p className="profile-tag-position">
            {position.charAt(0).toUpperCase()}
          </p>
        )}

        <MySlider
          classes={classes.slider}
          id={wbId}
          handleSlider={handleSlider}
          value={[startTime, endTime].map((time) => timeToValue(time))}
        />
      </div>

      <ProfileInfo
        setExpanded={setExpanded}
        expanded={expanded}
        userId={user.id}
        dayId={dayId}
      />
    </Paper>
  );
};

export default ProfileTag;