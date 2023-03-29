import React, { useEffect, useState } from "react";
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

function roundEnd(lastRequestEnd) {
  //if requestoff end is like 6PM, convert that to next day 12am
  //if its already 12am use that
  if (lastRequestEnd === lastRequestEnd.startOf("day")) {
    return lastRequestEnd;
  }
  return lastRequestEnd.add(1, "days").startOf("day");
}

function getDefaultDate(requestOffs) {
  let next = dayjs().add(2, "weeks").startOf("day");
  if (requestOffs.length < 1) {
    return next;
  }
  for (let request of requestOffs) {
    if (request[0].diff(next, "days", true) >= 1) {
      return next;
    }
    next = roundEnd(request[1]);
  }

  return roundEnd(requestOffs[requestOffs.length - 1][1]);
}

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

function AddRequest({ user, allRequests, updateRequests }) {
  const cantRequest = allRequests.map(({ start, end }) => [
    dayjs(start),
    dayjs(end),
  ]);
  const defaultDate = getDefaultDate(cantRequest);

  const minmax = [defaultDate, defaultDate.add(1, "years")];
  const [state, setState] = useState({
    start: { date: defaultDate, useingTime: false },
    end: { date: null, useingTime: false },
    toggle: 0,
    warning: true,
    success: false,
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const { start, end, toggle, warning, success } = state;

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
    }).then((response) =>
      response.json().then((data) => {
        if (response.ok) {
          updateRequests([...data]);
          setState({ ...state, success: true });
          return setTimeout(() => {
            setState({ ...state, success: false });
          }, 4000);
        }
        dispatch(
          updateAlert({
            content:
              "Your request off likely conflicted with another request off of yours.",
            severity: "error",
            title: "Unsuccessful",
          })
        );
      })
    );
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

  function getBackLocation(location) {
    const splitted = location.pathname.split("/");
    return splitted.slice(0, splitted.length - 1).join("/");
  }
  //each request has a start and end

  useEffect(() => {
    setState({ ...state, start: { ...state.start, date: defaultDate } });
  }, [allRequests]);

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
      <Divider sx={{ margin: "10px 0px" }} />
      <Collapse in={warning}>
        <Alert
          onClose={() => setState({ ...state, warning: false })}
          severity="info"
        >
          You can only request days off 2 weeks in advance
        </Alert>
      </Collapse>
      <Collapse in={success}>
        <Alert
          onClose={() => setState({ ...state, warning: false })}
          severity="success"
        >
          You're request was accepted
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
          {/*Same as datepicker but minmmax dependent on other one */}
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
