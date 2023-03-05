import React, { useState } from "react";
import MySlider from "./MySlider";
import SaveButton from "../SaveButton";
import { sliderValueToTime, timeToSliderValue } from "./TimeFunctions";
import "./availability.css";
import { Switch } from "@mui/material";
import SlideSwitch from "./SlideSwitch";

const DAYS_OF_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

function Availability({ availability, handleSave, userId, isHidden }) {
  const [sliders, setSliders] = useState(
    availability.map((av) => ({
      isAvailable: Boolean(av),
      value:
        typeof av == "boolean"
          ? [0, 100]
          : av.split("-").map((t) => timeToSliderValue(t)),
    }))
  );
  const [hasChanged, setHasChanged] = useState(false);

  function handleSlideSwitch(index, newValue) {
    !hasChanged && setHasChanged(true);
    let slidersCopy = [...sliders];

    if (typeof newValue === "boolean") {
      slidersCopy[index].isAvailable = newValue;
    } else {
      slidersCopy[index].value = newValue;
    }
    console.log("Newval: ", slidersCopy);
    setSliders(slidersCopy);
  }

  function handleSave(e) {
    //convert values to times
    e.preventDefault();
    if (hasChanged) {
      fetch("/api/update_user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          availability: sliders.map((slider) => [
            sliderValueToTime(slider[0]),
            sliderValueToTime(slider[1]),
          ]),
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("Maybe It saved");
        });
    }
  }

  return (
    <form
      onSubmit={handleSave}
      className="availability"
      style={{ display: isHidden ? "none" : "flex" }}
    >
      {/*     <h2 className="header">Availability</h2>
      <p className="help-text">
        {"Set the time(s) you're available on each of the given days."}
      </p>*/}
      <h3>When are you available?</h3>
      <ol>
        {sliders.map(({ value, isAvailable }, index) => (
          <li key={index}>
            <SlideSwitch
              weekday={DAYS_OF_WEEK[index]}
              value={value}
              isAvailable={isAvailable}
              handleSlideSwitch={handleSlideSwitch}
              index={index}
            />
          </li>
        ))}
      </ol>
      <SaveButton
        type="submit"
        onClick={handleSave}
        hasChanged={hasChanged}
        text="Availability"
      />
    </form>
  );
}

export default Availability;
