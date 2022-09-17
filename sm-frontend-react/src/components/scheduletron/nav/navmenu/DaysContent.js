import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const abreviated = {
  Monday: "Mon.",
  Tuesday: "Tues.",
  Wednesday: "Wed.",
  Thursday: "Thurs.",
  Friday: "Fri.",
  Saturday: "Sat.",
  Sunday: "Sun.",
};

const DayBtn = ({
  weekday,
  date,
  completion,
  disabled,
  id,
  path,
  weekId,
  dayIndex,
  changeMenu,
}) => {
  return (
    <Link
      to={`/scheduletron/viewer/${weekId}/${dayIndex}`}
      style={{
        height: 155,
        width: 155,
        color: "white",
        background: "#738D9B",
        borderRadius: 7,
        textDecoration: "none",
        textAlign: "center",
        boxShadow: "2px 10px 22px -6px rgba(0,0,0,0.37)",
        pointerEvents: disabled ? "none" : "auto",
        position: "relative",
      }}
    >
      <div
        style={{
          width: `${completion}%`,
          height: "100%",
          background: "#33789E",
          position: "absolute",
          borderRadius: "7px 0px 0px 7px",
        }}
      ></div>
      <div style={{ width: "100%", height: "100%", position: "absolute" }}>
        <h1
          style={{ fontSize: 31, margin: 0, marginTop: "18%", fontWeight: 700 }}
        >
          {abreviated[weekday]}
        </h1>
        <h3 style={{ fontSize: 25, margin: 0, fontWeight: 400 }}>{date}</h3>
        <small style={{ fontSize: 7, marginBottom: 0 }}>
          {completion}% Complete
        </small>
      </div>
    </Link>
  );
};

const styles = () => ({
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#E1E9EE",
    justifyContent: "space-evenly",
    height: "100%",
  },
});

class WeekBar extends Component {
  render() {
    const { week, path, setDay, menu, value, weekId } = this.props;

    return (
      <div
        style={{
          display: menu === value ? "flex" : "none",
          flexDirection: "column",
          gap: 40,
          alignItems: "center",
        }}
      >
        {week.map(({ weekday, staffing, month, day, id }, index) => (
          <DayBtn
            weekId={weekId}
            weekday={weekday}
            completion={Math.round(
              (staffing.actual / staffing.projected) * 100
            )}
            date={`${month}/${day}`}
            id={id}
            path={path}
            dayIndex={index}
          />
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(WeekBar);
