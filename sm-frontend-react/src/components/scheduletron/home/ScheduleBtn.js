import React from "react";
import scheduleIcon from "../../../assets/images/Schedule Icon.svg";
import "./home.css";
import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles({
  label: {
    flexDirection: "column",
    gap: "10px",
  },
});

const ScheduleBtn = ({
  week,
  completion,
  startDate,
  endDate,
  handleSelect,
  id,
}) => {
  const classes = useStyles();
  return (
    <Button
      classes={{ label: classes.label }}
      style={{
        textTransform: "none",
        position: "relative",
        justifyContent: "space-evenly",
        width: 145,
        height: 205,
        borderRadius: 7,
        fontSize: 25,
        background: "rgb(240,240,240)",
        background: `linear-gradient(90deg, rgba(240,240,240,1) ${completion}%, rgba(218,218,218,1) 50%)`,
        fontWeight: "400",
      }}
      onClick={() => handleSelect({ week: week, id: id })}
    >
      <p style={{ margin: 0 }}>{startDate}</p>
      <img style={{ width: 71 }} src={scheduleIcon} />
      <p style={{ margin: 0, marginBottom: 7 }}>{endDate}</p>
      <p
        style={{
          position: "absolute",
          bottom: 0,
          textAlign: "center",
          fontSize: 9,
          margin: "5px 0px",
        }}
      >
        {completion}% Complete
      </p>
    </Button>
  );
};

export default ScheduleBtn;
