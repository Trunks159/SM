import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

function getDefaultDate(offLimits, buffer = 0) {
  //start at this week and add weeks till you get a free week
  let next = dayjs().startOf("week").add(1, "days").add(buffer, "weeks");

  while (next.isBefore(next.add(1, "years"))) {
    if (isValidDate(next, offLimits)) {
      return next;
    }
    next = next.add(1, "weeks");
  }
}

function isValidDate(date, offLimits) {
  //should include maxdate
  for (let limit of offLimits) {
    if (date.isBetween(limit[0], limit[1], "day", "[)")) {
      return false;
    }
  }
  return true;
}

function MyDatePicker({ offLimits, handle, date }) {
  //dates are an array of dates that we cant pick
  const defaultDate = getDefaultDate(offLimits);

  const [minDate, maxDate] = [defaultDate, defaultDate.add(1, "years")];
  const screenWidth = useSelector((state) => state.screenWidth);
  const isDesktop = screenWidth >= 600;

  useEffect(() => {
    handle(defaultDate);
  }, []);

  function handleChange(newValue) {
    if (!isValidDate(newValue, offLimits)) {
      return;
    }
    return handle(newValue);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {(() => {
        const props = {
          label: "Enter Date",
          minDate,
          maxDate,
          value: date,
          onChange: handleChange,
          renderInput: (params) => <TextField {...params} />,
          shouldDisableDate: (date) => !isValidDate(date, offLimits),
        };
        return isDesktop ? (
          <DesktopDatePicker {...props} />
        ) : (
          <MobileDatePicker {...props} />
        );
      })()}
    </LocalizationProvider>
  );
}

export { MyDatePicker, isValidDate, getDefaultDate };
