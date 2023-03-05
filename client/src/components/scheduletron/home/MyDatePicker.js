import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TextField, CircularProgress, Fade } from "@mui/material";
import ScheduleLink from "./schedulelist/ScheduleLink";
import { Link } from "react-router-dom";

function MyDatePicker() {
  const [state, setState] = useState({
    value: dayjs().day(1).hour(0).minute(0).second(0).millisecond(0),
    foundWeek: null,
    minDate: null,
    maxDate: null,
  });
  const { value, foundWeek, minDate, maxDate } = state;
  const screenWidth = useSelector((state) => state.screenWidth);
  const isDesktop = screenWidth >= 860;
  const isLargeDesktop = screenWidth >= 1160;

  function handleDatePicker(date) {
    fetch(`/api/get_week_schedule?date=${date}`)
      .then((res) => res.json())
      .then((week) => setState({ ...state, foundWeek: week ? week : false }));
  }

  useEffect(() => {
    fetch("/api/get_minmax_of_all_weeks")
      .then((res) => res.json())
      .then((minMaxDates) => {
        if (minMaxDates[0] !== state.minDate || minMaxDates[1] !== maxDate) {
          setState({
            ...state,
            minDate: minMaxDates[0],
            maxDate: minMaxDates[1],
          });
        }
      });
  }, [minDate, maxDate]);
  return (
    isDesktop && (
      <Fade in={minDate && maxDate}>
        <div className="search" style={{ background: "white" }}>
          {foundWeek ? (
            <p style={{ textAlign: "center" }}>
              Found It! Open the week of <br />
              <Link
                to={`/scheduletron/viewer/${foundWeek.id}/${foundWeek.week[0].id}`}
              >
                {dayjs(foundWeek.week[0].date).format("M/DD/YYYY")}
              </Link>
            </p>
          ) : (
            <p>Looking for a schedule in particular?</p>
          )}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Enter Date"
              value={value}
              minDate={minDate && dayjs(minDate)}
              maxDate={maxDate && dayjs(maxDate)}
              renderInput={(params) => <TextField {...params} />}
              onChange={(newVal) => handleDatePicker(newVal.format())}
            />
          </LocalizationProvider>
          {isLargeDesktop && (
            <div className="found-date">
              {foundWeek ? (
                <ScheduleLink
                  startDate={dayjs(foundWeek.week[0].date).format("M/D")}
                  endDate={dayjs(foundWeek.week[6].date).format("M/D")}
                  completion={Math.round(
                    (foundWeek.staffing.actual / foundWeek.staffing.projected) *
                      100
                  )}
                  mondayId={foundWeek.week[0].id}
                  id={foundWeek.id}
                />
              ) : (
                <ScheduleLink startDate={"?"} endDate={"?"} />
              )}
            </div>
          )}
        </div>
      </Fade>
    )
  );
}

export default MyDatePicker;
