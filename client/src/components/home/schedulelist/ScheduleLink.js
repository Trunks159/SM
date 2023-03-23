import React from "react";
import scheduleIcon from "../assets/Schedule Icon.svg";
import { Link } from "react-router-dom";
import { Paper, Box } from "@mui/material";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";

function newWeek({ week, dayId }) {
  return {
    type: "NEW_WEEK",
    payLoad: { week, dayId },
  };
}

const StyledPaper = styled(Paper)(({ completion }) => {
  return {
    opacity: completion ? 1 : 0.7,
    width: 210,
    height: 300,
    display: "flex",
    boxSizing: "border-box",
    padding: "35px 0px",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    background: `linear-gradient(90deg, rgba(240,240,240,1) ${
      completion || 0
    }%, rgba(218,218,218,1) 50%)`,
    "&:hover": {
      transform: " translateY(-5px)",
      boxShadow: "0px 2px 4px 1px #33789e",
    },
    "& h2": {
      fontSize: 32,
      fontWeight: "normal",
      textDecoration: "none",
      margin: 0,
    },
    "& img": {
      width: "50%",
      margin: "auto 0px",
    },
    "& p": {
      visibility: completion ? "visible" : "hidden",
      position: "absolute",
      bottom: 0,
      textAlign: "center",
      fontSize: 11,
    },
  };
});

const StyledBox = styled(Box)(({ timeframe, id }) => {
  const isThisWeek = timeframe === "This Week";
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pointerEvents: id ? "auto" : "none",
    "& h4": {
      fontWeight: isThisWeek ? 500 : "normal",
      marginTop: 0,
      marginBottom: 15,
      color: isThisWeek ? "#0792B6" : "rgba(0,0,0,.7)",
    },
    "& a": {
      textDecoration: "none",
    },
    minWidth: 0,
    flexShrink: 0,
    marginBottom: 5,
  };
});

const ScheduleLink = ({
  timeframe,
  completion,
  startDate,
  endDate,
  days,
  id,
  monday,
}) => {
  const dispatch = useDispatch();
  return id ? (
    <StyledBox timeframe={timeframe} id={id}>
      <h4>{timeframe}</h4>
      <Link
        to={`/scheduletron/${dayjs(monday.date).format("YYYY-MM-DD")}`}
        onClick={() =>
          dispatch(newWeek({ week: { days, id }, dayId: days[0].id }))
        }
      >
        <StyledPaper completion={completion}>
          <h2>{startDate}</h2>
          <img alt="Schedule" src={scheduleIcon} />
          <h2>{endDate}</h2>
          <p>{completion}% Complete</p>
        </StyledPaper>
      </Link>
    </StyledBox>
  ) : (
    <StyledBox>
      <StyledPaper completion={completion}>
        <h2>?</h2>
        <img alt="Schedule" src={scheduleIcon} />
        <h2>?</h2>
      </StyledPaper>
    </StyledBox>
  );
};

export default ScheduleLink;
