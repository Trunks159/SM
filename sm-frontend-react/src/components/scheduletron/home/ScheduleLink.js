import React from "react";
import scheduleIcon from "../../../assets/images/Schedule Icon.svg";
import "./home.css";
import { makeStyles, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const ScheduleLink = ({
  week,
  completion,
  startDate,
  endDate,
  setSelectedWeek,
  id,
}) => {
  const style = {
    background: `linear-gradient(90deg, rgba(240,240,240,1) ${
      completion || 0
    }%, rgba(218,218,218,1) 50%)`,
    "&:hover": {
      background: "red",
    },
  };
  return (
    <Link
    to = {`/scheduletron/${id}`}
      className="home-schedule-link"
      style={completion ? style : { ...style, pointerEvents: "none" }}
    >
      <p>{startDate}</p>
      <img style={{ width: "50%" }} src={scheduleIcon} />
      <p>{endDate}</p>

      {completion && (
        <p
          style={{
            position: "absolute",
            bottom: 0,
            textAlign: "center",
            fontSize: 9,
          }}
        >
          {completion}% Complete
        </p>
      )}
    </Link>
  );
};

export default ScheduleLink;
