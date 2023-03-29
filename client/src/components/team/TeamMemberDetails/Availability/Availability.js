import React, { useState } from "react";
import SaveButton from "../SaveButton";
import {
  roundToNearestThirty,
  sliderToTime,
  timeToSlider,
} from "./TimeConversions";
import SlideSwitch from "./SlideSwitch";
import { Alert, Collapse, Divider } from "@mui/material";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

const DAYS_OF_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

function Availability({ availability, handleSave, isHidden, user }) {
  console.log(
    "Test: ",
    dayjs(dayjs(availability[0].end)).diff(
      "1970-01-01T00:00:00",
      "hour",
      true
    ) / 24
  );
  const [state, setState] = useState({
    sliders: availability.map(({ available, start, end }) => ({
      available,
      value: [timeToSlider(start), timeToSlider(end)],
    })),
    hasChanged: false,
    alert: false,
  });
  const { sliders, hasChanged, alert } = state;
  function handleSlideSwitch(index, newValue) {
    if (typeof newValue === "boolean") {
      sliders[index].available = newValue;
    } else {
      sliders[index].value = newValue;
    }
    setState({ hasChanged: true, sliders });
  }

  function handleSave(e) {
    //convert values to times
    e.preventDefault();
    if (!hasChanged) {
      return;
    }

    fetch(`/api/users?id=${user.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        availability: sliders.map((slider) => ({
          available: slider.available,
          start_time: roundToNearestThirty(sliderToTime(slider.value[0])),
          end_time: roundToNearestThirty(sliderToTime(slider.value[1])),
        })),
      }),
    }).then((response) =>
      response.json().then((data) => {
        if (response.ok) {
          return alertUser();
        }
        throw new Error(data);
      })
    );
  }

  function alertUser() {
    setState({ ...state, alert: true });
    setTimeout(() => {
      setState({ ...state, alert: false });
    }, 4000);
  }

  return (
    <form
      onSubmit={handleSave}
      className="availability"
      style={{ display: isHidden ? "none" : "flex" }}
    >
      <h2 className="title">When are you available?</h2>
      <div style={{ position: "fixed", top: 80, zIndex: 1 }}>
        <Collapse in={alert}>
          <Alert>Changes Saved</Alert>
        </Collapse>
      </div>

      <ol>
        {sliders.map(({ value, available }, index) => (
          <li key={index}>
            <SlideSwitch
              weekday={DAYS_OF_WEEK[index]}
              value={value}
              available={available}
              handleSlideSwitch={handleSlideSwitch}
              index={index}
            />
            <Divider sx={{ margin: "30px 0px 20px 0px" }} />
          </li>
        ))}
      </ol>
      <SaveButton hasChanged={hasChanged}>Availability</SaveButton>
    </form>
  );
}

export default Availability;
