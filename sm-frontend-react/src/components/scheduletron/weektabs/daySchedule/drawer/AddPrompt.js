import { Button, Paper } from "@mui/material";
import React from "react";
import detailsIcon from "./assets/Details Icon.svg";
import addIcon from "./assets/Add Icon.svg";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";

//ACTIONS
const addToScheduled = (index, date) => {
  return {
    type: "ADD_TO_SCHEDULED",
    payLoad: { index, date },
  };
};

const StyledPaper = styled(Paper)({
  color: "black",
  textTransform: "capitalize",
  background: "#F1F1F1",
  width: 155,
  height: 100,
  fontWeight: "normal",
  position: "relative",
  border: "1px solid #F1F1F1",
  padding: 10,
  borderRadius: 7,
  "& p": {
    margin: 10,
    fontSize: 22,
    textAlign: "center",
  },
  "& i": {
    fontWeight: 200,
    margin: 5,
    fontSize: 15,
    textAlign: "center",
  },

  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0px 2px 4px 1px #33789e",
  },
  minWidth: 0,
  transitionDuration: "1s",
  display: "flex",
  flexDirection: "column",
});

const DetailsButton = styled(Button)({
  position: "absolute",
  top: 0,
  right: 0,
  minWidth: 0,
  padding: 15,
});

function UserThumb({ handleAdd, firstName, lastName, position, index }) {
  return (
    <>
      <Button onClick={() => handleAdd(index)}>
        <img alt="Add" src={addIcon} />
      </Button>
      <StyledPaper>
        <p>
          {firstName}
          <br />
          {lastName}
        </p>
        <i> {position}</i>
        <DetailsButton className="details">
          <img alt="Details" src={detailsIcon} />
        </DetailsButton>
      </StyledPaper>
    </>
  );
}

function AddPrompt({ currentFunction, index, theDate }) {
  const currentSchedule = useSelector((state) => state.currentSchedule);
  const { notScheduled } = currentSchedule;
  const dispatch = useDispatch();

  function handleAdd(index, date = theDate) {
    dispatch(addToScheduled(index, date));
  }

  return (
    <div
      className="add-prompt"
      style={{
        display: currentFunction === index ? "flex" : "none",
        flexDirection: "column",
      }}
    >
      <p style={{ fontSize: 12, color: "rgb(200, 200, 200)" }}>
        Select team members you'd like to add to the schedule
      </p>

      <ul>
        {notScheduled.map(({ firstName, lastName, position }, i) => (
          <li key={i}>
            <UserThumb
              key={i}
              firstName={firstName}
              lastName={lastName}
              position={position}
              index={i}
              handleAdd={handleAdd}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddPrompt;
