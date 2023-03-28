import React from "react";
import dayjs from "dayjs";
import { Button, Divider } from "@mui/material";
import styled from "@emotion/styled";

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
  const isRegular =
    start.format("MM/DD/YYYY") !== end.format("MM/DD/YYYY") &&
    start.startOf("day").add(1, "days").format !== end.format(); //end isnt start's next day at 12:00am

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
