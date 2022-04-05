import { Paper } from "@material-ui/core";
import React from "react";
import timeLine from "../../assets/images/TimeLine.svg";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  paper: {
    maxWidth: 837,
    minWidth :400,
    height: 342,
    overflowY : 'auto',
    background : 'white'
  },
});

function TodaysSchedule({ teamMembers }) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <p style={{fontSize : 18, color : '#1897E6', fontWeight: 'bold'}}> Monday, 9/17</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
        }}
      >
        {"Team"}
        <img src={timeLine} />
        {teamMembers.map((member) => (
          <>
            <p style = {{textTransform :'capitalize', fontSize : 11, fontWeight : '500' }}>
              {member.firstName} {member.lastName}
            </p>
            <svg style={{ height: 10, width: "100%", margin: 15 }}>
              <line
                style={{ display: "flex", alignItems: "center" }}
                stroke={"#1897E6"}
                strokeWidth={"3"}
                x1={"0%"}
                y1={"50%"}
                x2={"70%"}
                y2={"50%"}
              />
            </svg>
          </>
        ))}
      </div>
    </Paper>
  );
}

export default TodaysSchedule;
