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

const DayBtn = ({ weekday, date, completion, disabled, id, path, setDay }) => {
  return (
    <Link
      to={`/scheduletron/${id}`}
      style={{
        height: 66,
        width: 66,
        color: "white",
        background: "#738D9B",
        borderRadius: 7,
        textDecoration: "none",
        textAlign: "center",
        boxShadow: "2px 10px 22px -6px rgba(0,0,0,0.37)",
        pointerEvents: disabled ? "none" : "auto",
        position: "relative",
      }}
      onClick={() => setDay(id)}
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
        <p
          style={{ fontSize: 16, margin: 0, marginTop: "18%", fontWeight: 700 }}
        >
          {abreviated[weekday]}
        </p>
        <p style={{ fontSize: 11, margin: 0 }}>{date}</p>
        <p style={{ fontSize: 8, marginTop: 5, marginBottom: 0 }}>
          {completion}% Complete
        </p>
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
    padding: "0px 15px",
    height: "100%",
    width: 120,
  },
});

class WeekBar extends Component {
  render() {
    const { week, classes, path, setDay, menu } = this.props;
    return (
      <div style={{display : menu === 'weekbar' ?  'flex' : 'none', flexDirection : 'column'}}>
        {week.map(({ weekday, staffing, month, day, id }) => (
          <DayBtn
            weekday={weekday}
            completion={Math.round(
              (staffing.actual / staffing.projected) * 100
            )}
            date={`${month}/${day}`}
            id={id}
            path={path}
            setDay={setDay}
          />
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(WeekBar);
