import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Collapse,
  Alert,
} from "@mui/material";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import MyDatePicker from "./MyDatePicker";
import backIcon from "./assets/Back Icon.svg";

dayjs.extend(isSameOrAfter);

function updateAlert(newAlert) {
  return {
    type: "UPDATE_ALERT",
    payLoad: newAlert,
  };
}

const StyledToggleButton = styled(ToggleButton)({
  "&.Mui-selected": {
    background: "#6CBDD2",
    color: "white",
    "&:hover": {
      background: "#329DB9",
    },
  },

  "&:hover": {
    background: "#ECECEC",
  },
  width: 130,
  textTransform: "none",
});

function AddRequest({ user, allRequests }) {
  const [state, setState] = useState({
    start: { date: dayjs().add(2, "weeks").startOf("day"), useingTime: false },
    end: { date: null, useingTime: false },
    toggle: 0,
    warning: true,
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const { start, end, toggle, warning } = state;

  function handleSubmit(e) {
    e.preventDefault();
    const request = {
      start: start.date.format(),
      end: end.date
        ? end.date.format()
        : start.date.add(1, "days").startOf("day").format(),
      user_id: user.id,
    };

    /*
    So if its 1 day it translates to that 
    dayjs().startof to dayjs() + 1day
    If its two days it translates pretty cleanly
    */
    fetch("/api/requestoffs", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .then((wasSuccessful) => {
        if (wasSuccessful) {
          dispatch(
            updateAlert({
              content: "Your request has been saved!",
              severity: "success",
              title: "Success",
            })
          );
        } else {
          dispatch(
            updateAlert({
              content:
                "Your request off likely conflicted with another request off of yours.",
              severity: "error",
              title: "Unsuccessful",
            })
          );
        }
      });
  }
  function handleDatePicker(name, newValue) {
    //when start changes, end changes if its below new start
    if (!Boolean(newValue)) {
      return;
    }
    let minimumEnd = newValue.add(1, "days").startOf("day");

    if (name === "start" && end.date && !end.date.isSameOrAfter(minimumEnd)) {
      //just use end
      return setState({
        ...state,
        end: { ...end, date: minimumEnd },
        [name]: { ...state[name], date: newValue },
      });
    }
    setState({
      ...state,
      [name]: { ...state[name], date: newValue },
    });
  }
  function handleToggle(e, newValue) {
    //if newval is 1, set end to something
    //if 0 set end to {null, false}
    setState({
      ...state,
      toggle: newValue,
      end:
        newValue === 1
          ? { ...state.end, date: start.date.add(1, "days") }
          : { date: null, useingTime: false },
    });
  }
  function handleUsingTime(newVal, name) {
    setState({ ...state, [name]: { ...state[name], useingTime: newVal } });
  }

  function getEndMinMax() {
    //end must be at all times 1 day after start at least
    //max never changes
    return;
  }

  function getBackLocation(location) {
    const splitted = location.pathname.split("/");
    return splitted.slice(0, splitted.length - 1).join("/");
  }

  const cantRequest = allRequests.map(({ start }) => dayjs(start).format());

  const minmax = [dayjs().add(2, "weeks"), dayjs().add(1, "years")];
  return (
    <form className="add-request" onSubmit={handleSubmit}>
      <Link className="back" to={getBackLocation(location)}>
        <img src={backIcon} alt={"Back"} />
      </Link>
      <h4>Request Off Form</h4>
      <h3>How Many Days are you requesting off for?</h3>
      <ToggleButtonGroup exclusive value={toggle} onChange={handleToggle}>
        <StyledToggleButton value={0}>One Day</StyledToggleButton>
        <StyledToggleButton value={1}>Several Days</StyledToggleButton>
      </ToggleButtonGroup>
      <Divider />
      <Collapse in={warning}>
        <Alert
          onClose={() => setState({ ...state, warning: false })}
          severity="info"
        >
          You can only request days off 2 weeks in advance
        </Alert>
      </Collapse>

      <div>
        <h3>{`${end.date ? "Start " : ""}Date`}</h3>
        <MyDatePicker
          cantRequest={cantRequest}
          minDate={minmax[0]}
          maxDate={minmax[1]}
          handleDatePicker={handleDatePicker}
          value={start.date}
          name="start"
          useingTime={start.useingTime}
          handleUsingTime={handleUsingTime}
        />
      </div>

      <Collapse in={Boolean(end.date)}>
        <div>
          <h3>End Date</h3>
          <MyDatePicker
            cantRequest={cantRequest}
            minDate={start.date.add(1, "days").startOf("day")}
            maxDate={minmax[1].add(1, "days").startOf("day")}
            handleDatePicker={handleDatePicker}
            value={end.date}
            name="end"
            useingTime={end.useingTime}
            handleUsingTime={handleUsingTime}
          />
        </div>
      </Collapse>

      <Button
        sx={{
          background: "#363636",
          marginLeft: "auto",
          textTransform: "none",
        }}
        variant="contained"
        type="submit"
        size="large"
      >
        Submit
      </Button>
    </form>
  );
}

export default AddRequest;
