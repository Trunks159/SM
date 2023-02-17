import { Divider } from "@mui/material";
import React from "react";

function RegularCard({ dateOff, timeOff, position }) {
  <div>
    <p>Single Day</p>
    <h2>{dateOff}</h2>
    <p>
      {timeOff
        ? `You are off from: ${timeOff[0]} to ${timeOff[1]}`
        : "You have the entire day off"}
    </p>
  </div>;
}

function RangeCard(dateOff, timeOff) {
  //so timeoff is an array of arrays
  //if [[stuff], []] means only the first date has a restriction
  //if you get [[], [stuff]], then that is the second restriction
  //if you get [[stuff], [stuff]]
  <div>
    <RegularCard dateOff={dateOff[0]} timeOff={timeOff[0]} position="left" />
    <Divider orientation="vertical">To</Divider>
    <RegularCard dateOff={dateOff[1]} timeOff={timeOff[1]} position="right" />
  </div>;
}

function RequestCard(props) {
  const type = Array.isArray(props.dateOff) ? "range" : "regular";
  return type === "regular" ? (
    <RegularCard {...props} />
  ) : (
    <RangeCard {...props} />
  );
}

export default RequestCard;

/*
Two types of cards, single day and date range
It could also have the time included but it doesnt need it

so maybe dateOff = '7/16/22'
        dateOff = ['7/16/22', '7/24/22']
if it sees a list it makes the range one
if not regular

so for regular,
if no time is inputed, they are off all day
if 1 time is inputed use that time
2 times can only be inputted if its a date range
*/
