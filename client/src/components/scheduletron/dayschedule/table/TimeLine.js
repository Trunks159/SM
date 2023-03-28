import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResizeDetector } from "react-resize-detector";
import { Divider } from "@mui/material";
import dayjs from "dayjs";

//ACTIONS------
const updateTrackLength = (newLength) => ({
  type: "UPDATE_TRACK_LENGTH",
  payLoad: newLength,
});

const getTimeLabels = (timerange) => {
  let labels = [];
  const [start, end] = [dayjs(timerange[0]), dayjs(timerange[1])];
  const segment = end.diff(start, "hour", true) / 4;
  let time = start;
  while (time.isBefore(end)) {
    labels.push(time.format("h:mm a"));
    time = time.add(segment, "hours");
  }
  labels.push(end.format("h:mm a"));

  return labels;
};

const TimeLine = () => {
  const screenWidth = useSelector((state) => state.screenWidth);
  const currentSchedule = useSelector((state) => state.currentSchedule);
  const timeLabels = getTimeLabels(currentSchedule.timerange);
  const dispatch = useDispatch();
  const { height, ref } = useResizeDetector();

  useEffect(() => {
    const _track_length = height || 0;
    dispatch(updateTrackLength(_track_length));
  }, [height]);
  //line and lables
  //labels are abso
  return (
    <div
      className="timeline"
      style={{
        height: "100%",
      }}
    >
      <Divider
        ref={ref}
        style={{
          background: "black",
          width: 1,
          opacity: 0.5,
          height: "90%",
          margin: "0px auto",
        }}
        orientation={screenWidth >= 600 ? "horizontal" : "vertical"}
        className={"timeline-divider"}
      />
      <div className="timeline-labels">
        {timeLabels.map((time, index) => (
          <p
            key={index}
            style={{
              fontSize: index % 2 !== 0 ? "9px" : "12px",
              //marginTop: index % 2 !== 0 ? "auto" : 0,
            }}
          >
            {time}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TimeLine;
