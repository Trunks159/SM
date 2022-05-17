import React from "react";
import scheduleIcon from "../../../assets/images/Schedule Icon.svg";
import "./home.css";
import { makeStyles, Button } from "@material-ui/core";

const ScheduleBtn = ({
  week,
  completion = null,
  startDate,
  endDate,
  handleSelect,
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
    <button
      className="schedule-btn"
      style={completion ? style : { ...style, pointerEvents: "none" }}
      onClick={() => handleSelect({ week: week, id: id })}
    >
      <p style={{}}>{startDate}</p>
      <img style={{ width: "50%" }} src={scheduleIcon} />
      <p style={{}}>{endDate}</p>

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
    </button>
  );
};

export default ScheduleBtn;
