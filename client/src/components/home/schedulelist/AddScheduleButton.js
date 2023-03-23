import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Box, Button, Collapse, Divider, TextField } from "@mui/material";
import addIcon from "./assets/Add Icon.svg";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

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

const getAllDates = (weeks) => {
  let dates = [];
  for (let week of weeks) {
    for (let day of week.days) {
      dates.push(dayjs(day.date).format());
    }
  }
  return dates;
};

function getDefaultDate(weeks) {
  //start at this week and add weeks till you get a free week
  let next = dayjs().startOf("day").startOf("week").add(1, "days");
  while (true) {
    if (
      !weeks.find(
        ({ mondayDate }) => dayjs(mondayDate).format() === next.format()
      )
    ) {
      return next;
    }
    next = next.add(1, "weeks");
  }
}
function AddScheduleButton({ postNewWeek, weeks }) {
  const defaultDate = getDefaultDate(weeks);
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(defaultDate);
  const screenWidth = useSelector((state) => state.screenWidth);
  const isDesktop = screenWidth >= 860;

  useEffect(() => {
    setDate(dayjs(defaultDate));
  }, [weeks]);
  const allDates = getAllDates(weeks);

  function handleSubmit() {
    postNewWeek(date.format());
    //update value
    setIsOpen(false);
  }
  const minmax = [dayjs(defaultDate), dayjs(defaultDate).add(3, "months")];
  console.log("Date: ", date.format());
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {(() => {
                const props = {
                  label: "Enter Date",
                  minDate: minmax[0],
                  maxDate: minmax[1],
                  value: date,
                  defaultValue: defaultDate,
                  onChange: (newval) => {
                    if (allDates.includes(dayjs(newval).format())) {
                      return;
                    }
                    return setDate(newval);
                  },
                  renderInput: (params) => <TextField {...params} />,
                  shouldDisableDate: (date) =>
                    allDates.includes(dayjs(date).format()),
                };
                return isDesktop ? (
                  <DesktopDatePicker {...props} />
                ) : (
                  <MobileDatePicker {...props} />
                );
              })()}
            </LocalizationProvider>
          </DatePickerContainer>

          <StyledSubmitButton onClick={handleSubmit}>Submit</StyledSubmitButton>
        </StyledCollapseBox>
      </Collapse>
    </StyledMainBox>
  );
}

export default AddScheduleButton;
