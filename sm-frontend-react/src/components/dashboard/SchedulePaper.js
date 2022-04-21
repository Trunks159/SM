import { Paper } from "@material-ui/core";
import React from "react";
import TimeLine from "../TimeLine";
import { makeStyles, Tooltip } from "@material-ui/core";
import { timeToValue } from "../user/TimeFunctions";
import scheduleIcon from "../../assets/images/Schedule Icon Watermark.svg";

const useStyles = makeStyles({
  paper: {
    minWidth: "100%",
    boxSizing: "border-box",
    minHeight: "100%",
    background: "transparent",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
});

function SchedulePaper({ schedule, header }) {
  const { weekday, day, month, year, workblocks } = schedule;
  const classes = useStyles();
  console.log("Header: ", header);
  return (
    <Paper className={classes.paper} elevation={header ? 2 : 0}>
      {header ? (
        <>
          <img
            alt={""}
            style={{ position: "absolute", margin: 5 }}
            src={scheduleIcon}
          />
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
        </>
      ) : null}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <div style={{ flex: "0 0 10%" }}></div>
        <TimeLine />
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          boxShadow: "border-box",
          overflowY: "auto",
          flexDirection: "column",
        }}
      >
        {workblocks
          ? workblocks.map(({ startTime, endTime, user }) => {
              const newStartTime = timeToValue(startTime);
              const newEndTime = timeToValue(endTime);
              return (
                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    alignItems: "center",
                  }}
                  key={user.id}
                >
                  <p
                    style={{
                      textTransform: "capitalize",
                      fontSize: 11,
                      fontWeight: "500",
                      flex: "0 0 10%",
                    }}
                  >
                    {user.firstName} {user.lastName}
                  </p>

                  <svg
                    style={{
                      height: 10,
                      width: "100%",
                    }}
                  >
                    <Tooltip
                      title={`${startTime}-${endTime}`}
                      placement={"top"}
                    >
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
                </div>
              );
            })
          : null}
      </div>
    </Paper>
  );
}

export default SchedulePaper;
