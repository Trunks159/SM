import React, { useState } from "react";
import SaveButton from "../SaveButton";
import {
  sliderToTime,
  timeToSlider,
  valueLabelFormat,
} from "./TimeConversions";
import "./availability.css";
import SlideSwitch from "./SlideSwitch";
import { Divider } from "@mui/material";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";

function updateAlert(alert) {
  return {
    type: "UPDATE_ALERT",
    payLoad: alert,
  };
}

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
  const [state, setState] = useState({
    sliders: availability.map(({ available, start, end }) => ({
      available,
      value: [timeToSlider(start), timeToSlider(end)],
    })),
    hasChanged: false,
  });
  const dispatch = useDispatch();
  const { sliders, hasChanged } = state;
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
    console.log("Haschanged: ", hasChanged);

    fetch(`/api/users?user-id=${user.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        availability: sliders.map((slider) => ({
          start_time: sliderToTime(slider[0]),
          end_time: sliderToTime(slider[1]),
        })),
      }),
    }).then((response) =>
      response.json().then((data) => {
        if (response.ok) {
          return dispatch(
            updateAlert({
              content: "Changes saved",
              severity: "success",
              title: "Success",
            })
          );
        }
        throw new Error(data);
      })
    );
  }

  return (
    <form
      onSubmit={handleSave}
      className="availability"
      style={{ display: isHidden ? "none" : "flex" }}
    >
      <h3>When are you available?</h3>
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
