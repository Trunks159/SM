import { Divider } from "@mui/material";
import moment from "moment";
import React from "react";

function RegularCard({ start, end }) {
  const isWholeDay =
    start.format("HH:mm") === "00:00" && end.format("HH:mm") === "00:00";
  return (
    <div>
      <p>Single Day</p>
      <h2>{start.format("M/D/YY")}</h2>
      <p>
        {isWholeDay
          ? "You have the entire day off"
          : `You are off from: ${start.format("h:mm a")} to ${end.format(
              "h:mm a"
            )}`}
      </p>
    </div>
  );
}

function RangeCard(props) {
  //so timeoff is an array of arrays
  //if [[stuff], []] means only the first date has a restriction
  //if you get [[], [stuff]], then that is the second restriction
  //if you get [[stuff], [stuff]]
  return (
    <div>
      <RegularCard {...props} position="left" />
      <Divider orientation="vertical">To</Divider>
      <RegularCard {...props} position="right" />
    </div>
  );
}

function RequestCard({ props }) {
  type =
    moment(props.end).diff(moment(props.start), "days") > 1
      ? "range"
      : "regular";
  return type === "regular" ? (
    <RegularCard start={moment(start)} end={moment(end)} />
  ) : (
    <RangeCard start={moment(start)} end={moment(end)} />
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
