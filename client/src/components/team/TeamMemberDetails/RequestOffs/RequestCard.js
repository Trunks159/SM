import styled from "@emotion/styled";
import { Button, Divider } from "@mui/material";
import moment from "moment";
import React from "react";

const RequestCardButton = styled(Button)(({ isClickable }) => ({
  minWidth: 0,
  textTransform: "none",
  pointerEvents: isClickable ? "auto" : "none",
  background: "#555555",
  flexShrink: 0,
}));

function CardContents({ start, end, position }) {
  const isWholeDay =
    start.format("HH:mm") === "00:00" && end.format("HH:mm") === "00:00";
  return (
    <div className="card-contents">
      <p
        className={`type${position === "right" ? " type-hidden" : ""}`}
        style={{ color: position ? "#00FFDC" : "white" }}
      >
        {position ? "Multi-Days" : "Single Day"}
      </p>
      <h2>
        {position === "right" ? end.format("M/D/YY") : start.format("M/D/YY")}
      </h2>
      <p className="time-off">
        {isWholeDay
          ? "You have the entire day off"
          : `You are off from: ${start.format("h:mm a")} to ${end.format(
              "h:mm a"
            )}`}
      </p>
    </div>
  );
}

const MyDivider = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: "white",
  height: "100px",
  fontStyle: "italic",
  fontSize: 11,

  "& .MuiDivider-root": {
    flex: 1,
    background: "rgba(0,0,0,.26)",
    width: 0.5,
  },
});

function RequestCard(props) {
  //if start and end have different dates and end.time
  //!= 12AM, its a range
  const { start, end } = props;
  let startCopy = moment(start);
  const isRegular = !(
    (
      start.format("MM/DD/YYYY") !== end.format("MM/DD/YYYY") &&
      startCopy.hour(0).minute(0).add(1, "days").format !== end.format()
    ) //end isnt start's next day at 12:00am
  );

  return (
    <RequestCardButton>
      {isRegular ? (
        <CardContents {...props} />
      ) : (
        <>
          <CardContents {...props} position="left" />

          <MyDivider>
            <Divider orientation="vertical" />
            <p>To</p>
            <Divider orientation="vertical" />
          </MyDivider>

          <CardContents {...props} position="right" />
        </>
      )}
    </RequestCardButton>
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
