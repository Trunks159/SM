import React, { useState } from "react";
import MySlider from "./MySlider";
import SaveButton from "../SaveButton";
import { sliderValueToTime, timeToSliderValue } from "./TimeFunctions";
import "./availability.css";

const DAYS_OF_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

function Availability({ availability, handleSave, userId }) {
  const [sliders, setSliders] = useState(
    availability.map((av) =>
      typeof av == "boolean"
        ? [0, 100]
        : av.split("-").map((t) => timeToSliderValue(t))
    )
  );
  const [hasChanged, setHasChanged] = useState(false);

  function handleSlider(index, newValue) {
    !hasChanged && setHasChanged(true);
    let slidersCopy = [...sliders];
    slidersCopy[index] = newValue;
    setSliders(slidersCopy);
  }

  function handleSave(e) {
    //convert values to times
    e.preventDefault();
    if (hasChanged) {
      fetch("/update_user", {
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
    <form onSubmit={handleSave} className="availability">
      <h2 className="header">Availability</h2>
      <p className="help-text">{"Set the time(s) you're available on each of the given days."}</p>
      <ol>
        {sliders.map((value, index) => (
          <li key={index}>
            <h5>{DAYS_OF_WEEK[index]}</h5>
            <MySlider
              index={index}
              disabled={availability[index] === false}
              value={value}
              handleSlider={handleSlider}
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
