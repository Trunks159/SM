import React, { useRef, useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Divider } from "@material-ui/core";

//ACTIONS------
const updateTrackLength = (newLength) => ({
  type: "UPDATE_TRACK_LENGTH",
  payLoad: newLength,
});

const getTimeLabels = (shiftFilter) => {
  const { day, night } = shiftFilter;
  const labels = {
    both: ["6am", "10:30am", "3pm", "7:30pm", "12am"],
    day: ["6am", "10:30am", "3pm"],
    night: ["3pm", "7:30pm", "12am"],
  };
  if (day && night) {
    return labels.both;
  } else if (day) {
    return labels.day;
  }
  return labels.night;
};

const TimeLine = ({ shiftFilter }) => {
  const timeLabels = getTimeLabels(shiftFilter);
  const screenWidth = useSelector((state) => state.screenWidth);
  const dispatch = useDispatch()
  const [height, setHeight] = useState(0);

  const myRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);
  console.log('Track: ', height)

  return (
    <div
      className="timeline"
      style={{
        height: "100%",
      }}
      
    >
      <div className="timeline-labels">
        {timeLabels.map((time, index) => (
          <p
            key={index}
            style={{
              fontSize: index % 2 !== 0 ? "6px" : "10px",
              //marginTop: index % 2 !== 0 ? "auto" : 0,
            }}
          >
            {time}
          </p>
        ))}
      </div>
      <Divider
      ref={myRef}
        style={{
          background: "black",
          width: 1,
          opacity: 0.5,
          margin: "0px 9px",
        }}
        orientation={screenWidth >= 600 ? "horizontal" : "vertical"}
        className={"timeline-divider"}
      />
    </div>
  );
};

export default TimeLine;
