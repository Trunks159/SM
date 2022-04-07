import { Paper } from "@material-ui/core";
import React from "react";
import TimeLine from "./TimeLine";
import { makeStyles, Tooltip } from "@material-ui/core";
import { timeToValue } from "../user/TimeFunctions";
import scheduleIcon from '../../assets/images/Schedule Icon Watermark.svg'


const useStyles = makeStyles({
  paper: {
    maxWidth: 837,
    minWidth: 400,
    height: 342,
    overflowY: "auto",
    background: "white",
    margin :15,
    position : 'relative'
  },
});

function TodaysSchedule() {
  const [day, setDay] = React.useState(null);
  const classes = useStyles();

  React.useEffect(() => {
    const today = { day: 13, month: 9, year: 2021 };
    fetch(`get_day/${today.month}-${today.day}-${today.year}`)
      .then((response) => response.json())
      .then((day) => setDay(day));
  }, []);

  return day ? (
    <Paper className={classes.paper} elevation = {2}>
      <img style = {{position : 'absolute', margin :5}} src = {scheduleIcon}/>
      <p style={{ fontSize: 18, color: "#1897E6", fontWeight: "bold", margin :5, marginLeft  : 25 }}>
        {`${day.weekday}    ${day.month}/${day.day}/${day.year}`}
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 7fr",
          alignItems: "center",
          gridGap : 10,
          width : '100%'
        }}
      >
      <p style = {{fontSize : 12}}>Team</p>
        <TimeLine/>
        {day.workblocks.map(({ startTime, endTime, user }) => {
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

              <svg style={{ height: 10, width: "95.5%", margin: 15, }}>
                <Tooltip title={`${startTime}-${endTime}`} placement={"top"}>
                  <line
                    style={{ display: "flex", alignItems: "center" }}
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
  ) : null;
}

export default TodaysSchedule;
