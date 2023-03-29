import { TextField, Button, Paper } from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { isValidDate } from "../../../home/schedulelist/MyDatePicker";

function MyDatePicker({
  minDate,
  maxDate,
  handleDatePicker,
  value,
  name,
  useingTime,
  handleUsingTime,
  cantRequest,
}) {
  return (
    <div style={{ padding: "0px 20px", width: "max-content" }}>
      <Paper
        sx={{
          padding: "25px",
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          alignSelf: "center",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {(() => {
            const params = {
              shouldDisableDate: (date) => {
                return !isValidDate(date, cantRequest);
              },
              value,
              minDate,
              maxDate,
              renderInput: (params) => (
                <TextField {...params} variant="standard" />
              ),
              onChange: (newVal) => handleDatePicker(name, newVal),
            };
            return useingTime ? (
              <DesktopDateTimePicker {...params} />
            ) : (
              <DesktopDatePicker {...params} />
            );
          })()}
        </LocalizationProvider>

        <Button
          sx={{
            textTransform: "none",
            color: "#707070",
            marginLeft: "auto",
          }}
          onClick={() => handleUsingTime(!useingTime, name)}
        >
          {useingTime ? "ignore" : "add"} time
        </Button>
      </Paper>
    </div>
  );
}

export default MyDatePicker;
