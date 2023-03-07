import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

function DayBtn({ weekday, date, completion, disabled, weekId, dayId }) {
  return (
    <Link
      to={`/scheduletron/${weekId}/${dayId}`}
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
          {weekday}
        </h1>
        <h3 style={{ fontSize: 25, margin: 0, fontWeight: 400 }}>{date}</h3>
        <small style={{ fontSize: 7, marginBottom: 0 }}>
          {completion}% Complete
        </small>
      </div>
    </Link>
  );
}

function WeekBar({ week, path, menu, value, weekId }) {
  return (
    <div
      style={{
        display: menu === value ? "flex" : "none",
        flexDirection: "column",
        gap: 40,
        alignItems: "center",
      }}
    >
      {week.map(({ staffing, date, id }) => {
        const theDate = moment(date);
        return (
          <DayBtn
            key={id}
            weekId={weekId}
            weekday={theDate.format("ddd")}
            completion={Math.round(
              (staffing.actual / staffing.projected) * 100
            )}
            date={theDate.format("MM/DD")}
            id={id}
            path={path}
            dayId={id}
          />
        );
      })}
    </div>
  );
}

export default WeekBar;
