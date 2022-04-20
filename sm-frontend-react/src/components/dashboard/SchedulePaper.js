import { Paper } from "@material-ui/core";
import React from "react";
import TimeLine from "../TimeLine";
import { makeStyles, Tooltip } from "@material-ui/core";
import { timeToValue } from "../user/TimeFunctions";
import scheduleIcon from "../../assets/images/Schedule Icon Watermark.svg";

const useStyles = makeStyles({
  paper: {
    maxWidth: 837,
    minWidth: 400,
    height: 342,
    overflowX: "hidden",

    background: "white",
    margin: 15,
    position: "relative",
  },
});

function SchedulePaper({ schedule }) {
  const { weekday, day, month, year, workblocks } = schedule;
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={2}>
      <img style={{ position: "absolute", margin: 5 }} src={scheduleIcon} />
      <p
        style={{
          fontSize: 18,
          color: "#1897E6",
          fontWeight: "bold",
          margin: 10,
          marginLeft: 25,
        }}
      >
        {`${weekday}    ${month}/${day}/${year}`}
      </p>
      <TimeLine />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 8fr",
          alignItems: "center",
          gridGap: 10,
          width: "100%",
          marginLeft: 20,
          overflowY: "auto",
          height: "90%",
        }}
      >
        {workblocks.map(({ startTime, endTime, user }) => {
          const newStartTime = timeToValue(startTime);
          const newEndTime = timeToValue(endTime);
          return (
            <>
              <p
                style={{
                  textTransform: "capitalize",
                  fontSize: 11,
                  fontWeight: "500",
                }}
              >
                {user.firstName} {user.lastName}
              </p>

              <svg style={{ height: 10, width: "86.5%", padding: 15 }}>
                <Tooltip title={`${startTime}-${endTime}`} placement={"top"}>
                  <line
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: 100,
                      background: "orange",
                    }}
                    stroke={"#1897E6"}
                    strokeWidth={"5"}
                    x1={`${newStartTime}%`}
                    y1={"50%"}
                    x2={`${newEndTime}%`}
                    y2={"50%"}
                  />
                </Tooltip>
              </svg>
            </>
          );
        })}
      </div>
    </Paper>
  );
}

export default SchedulePaper;
