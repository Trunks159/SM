import styled from "@emotion/styled";
import { Button, Divider } from "@mui/material";
import moment from "moment";
import React from "react";

const RequestCardButton = styled(Button)({
  minWidth: 0,
  textTransform : 'none',
});

function CardContents({ start, end }) {
  const isWholeDay =
    start.format("HH:mm") === "00:00" && end.format("HH:mm") === "00:00";
  return (
    <div className="card-contents">
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

function RequestCard(props) {
  //if start and end have different dates and end.time
  //!= 12AM, its a range
  const { start, end } = props;
  const isRegular = !(
    start.format("MM/DD/YYYY") !== end.format("MM/DD/YYYY") && end.hour() !== 0
  );

  return (
    <RequestCardButton>
      {isRegular ? (
        <CardContents {...props} />
      ) : (
        <>
          <CardContents {...props} position="left" />
          <Divider>To</Divider>
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
