import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box, Button, Collapse, Divider } from "@mui/material";
import addIcon from "./assets/Add Icon.svg";
import dayjs from "dayjs";
import { MyDatePicker } from "./MyDatePicker";

const StyledMainBox = styled(Box)(({ isOpen, theme }) => ({
  position: "fixed",
  bottom: 0,
  right: 0,
  margin: "0px auto",
  left: 0,
  background: isOpen ? "#275C78" : "#606060",
  borderRadius: "15px 15px 0px 0px",
  maxWidth: 300,
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("sm")]: {
    position: "absolute",
    left: "auto",
  },
}));

const StyledCollapseBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "0px 20px 20px 20px",
  "& h3": {
    color: "white",
    fontSize: 23,
    fontWeight: "normal",
    margin: "10px 0px",
  },
});

const DatePickerContainer = styled(Box)({
  background: "white",
  borderRadius: 7,
  flex: 1,
  display: "flex",
  justifyContent: "center",
  padding: 20,
  margin: "12px 0px",
});

const StyledButton = styled(Button)(({ isOpen, theme }) => ({
  borderRadius: "15px 15px 0px 0px",
  "&:hover": {
    background: "#275C78",
  },
  textTransform: "none",
  color: "white",
  width: "100%",
  justifyContent: "center",
  padding: "10px 0px",
  "& img": {
    marginRight: 20,
    transform: `rotate(${isOpen ? "45" : "0"}deg)`,
    transitionDuration: 0.7,
    transition: "transform .3s",
  },
}));

const StyledDivider = styled(Divider)({
  background: "#9E9E9E",
  opacity: 0.31,
  marginBottom: 20,
});

const StyledSubmitButton = styled(Button)({
  background: "black",
  borderRadius: 7,
  textTransform: "none",
  color: "white",
  fontSize: 18,
  padding: "8px 20px",
  marginLeft: "auto",
});

function AddScheduleButton({ postNewWeek, weeks }) {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(null);

  function handleSubmit() {
    postNewWeek(date.format());
    //update value
    setIsOpen(false);
  }

  return (
    <StyledMainBox>
      <div style={{ display: "flex" }}>
        <StyledButton
          endIcon={<img alt="Add" src={addIcon} />}
          onClick={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
        >
          {isOpen ? "Cancel" : "Add A Schedule"}
        </StyledButton>
      </div>

      <Collapse in={isOpen}>
        <StyledCollapseBox>
          <h3>What week are you trying to add?</h3>
          <StyledDivider />
          <DatePickerContainer>
            <MyDatePicker
              offLimits={weeks.map(({ mondayDate }) => [
                dayjs(mondayDate),
                dayjs(mondayDate).add(1, "weeks"),
              ])}
              date={date}
              handle={setDate}
            />
          </DatePickerContainer>

          <StyledSubmitButton onClick={handleSubmit}>Submit</StyledSubmitButton>
        </StyledCollapseBox>
      </Collapse>
    </StyledMainBox>
  );
}

export default AddScheduleButton;
