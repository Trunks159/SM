import React, { Component } from "react";

import scheduleIconWhite from "../../../assets/images/Schedule Icon White.svg";
import openIcon from "../../../assets/images/Open Icon.svg";
import openIconInactive from "../../../assets/images/Open Icon Not Active.svg";
import addIcon from "../../../assets/images/Add Icon.svg";
import { Link, withRouter } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, TextField, Paper, withStyles } from "@material-ui/core";
import ScheduleBtn from "./ScheduleBtn";

const styles = () => ({

});

class Home extends Component {
  state = {};

  render() {
    const { classes, handleSelect, match, selected, schedules } = this.props;
    return (
      <div
        style={{
          background: "#F0F0F0",
          height: "100%",
          width: "100%",
          display: "flex",
        }}
      >
        <div style={{}}>
          <p style={{ fontSize: 31 }}>
            To start, select schedule to <b>view</b> or <b>edit</b>
          </p>
          <div
            style={{
              display: "inline-flex",
              gap: 10,
              background: "white",
              padding: 20,
              margin: 20,
              alignItems: "center",
              borderRadius: 7,
            }}
          >
            {schedules.map(({ week, timeFrame, staffing, id }) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    textTransform: "capitalize",
                    fontSize: 15,
                    margin: 0,
                  }}
                >
                  {timeFrame}
                </p>
                <ScheduleBtn week = {week} staffing = {staffing} id = {id} handleSelect = {handleSelect} />
              </div>
            ))}
          </div>

          <div style={{ display: "flex", padding: 25, gap: 15 }}>
            <Button
              style={{
                marginLeft: "auto",
                textTransform: "none",
                color: "white",
                background: "#606060",
                padding: "10px 20px",
              }}
              startIcon={<img style={{ width: 20 }} src={addIcon} />}
            >
              Add A Schedule
            </Button>
            <Link
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: selected ? "#1897E6" : "#CBCBCB",
                pointerEvents: selected ? "auto" : "none",
              }}
              to={selected ? `${match.path}/${selected.id}` : "/"}
            >
              <img
                style={{
                  filter: selected
                    ? "invert(48%) sepia(80%) saturate(1387%) hue-rotate(174deg) brightness(92%) contrast(94%)"
                    : "none",
                }}
                src={openIconInactive}
              />
              Open{" "}
              {selected
                ? `${selected.week[0].month}/${selected.week[0].day} - ${selected.week[6].month}/${selected.week[6].day}`
                : null}
            </Link>
          </div>
        </div>

        <div>
          <p>Looking for a schedule in particular?</p>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Enter Date"
              value={"02/22/1998"}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button
            style={{
              background: "#DDDDDD",
              color: "white",
              borderRadius: "7px",
            }}
            classes={{ label: classes.label, root: classes.button }}
          >
            ?
            <img style={{ width: 72 }} src={scheduleIconWhite} />?
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(Home));
