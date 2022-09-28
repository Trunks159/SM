import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import stretchIcon from "./assets/Stretch Icon.svg";
import { Paper } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  timeToPix,
  pixToTime,
  convertDates,
  roundIt,
  pixToString,
  thirtyMin,
} from "./TimeFunctions";

const TimeSlot = ({ isMobile, index, user, availableTimes }) => {
  const myRef = useRef(null);
  const [width, setWidth] = useState(0);
  let timeslot = useSelector((state) => state.timeslots);
  timeslot = {
    startTime: timeslot ? timeslot.startTime : 0,
    endTime: timeslot ? timeslot.endTime : 200,
  };

  useEffect(() => {
    const { startTime, endTime, isMobile } = this.props;

    const width = this.myRef.current.parentElement.clientWidth;
    const height = this.myRef.current.parentElement.clientHeight;

    this.setState({
      width: width,
      height: height,
      containerSize: isMobile ? height : width,
      startTime: this.timeToPix(startTime, width),
      endTime: this.timeToPix(endTime, width),
    });
    /*
    This is for when the timeslots becomes verticle in mobile

    const containerSize = this.props.isMobile
    ? this.myRef.current.parentElement.clientHeight
    : this.myRef.current.parentElement.clientWidth;
  //convert current pix to time then back to pix based on the containersize
  this.setState({ containerSize: containerSize });*/
  }, [isMobile]);

  return (
    <div ref={this.myRef} style={{ position: "relative", height: "100%" }}>
      <Paper
        className="timeslot"
        style={{
          top: 0,
          bottom: 0,
          margin: "6px 0px 6px 0px",
          left: startTime,
          right: width - endTime < 0 ? 0 : width - endTime,
          minWidth: 200,
        }}
      >
        {user.firstName} {user.lastName} startTime :
        {this.pixToString(startTime)}, endtime:
        {this.pixToString(endTime)}
      </Paper>
      <Draggable
        axis="x"
        grid={[this.thirtyMin(startTime), 0]}
        position={{ x: startTime, y: 0 }}
        bounds={{ left: 0, right: endTime - 200 }}
        onDrag={(e, newValue) => this.setState({ startTime: newValue.x })}
      >
        <div className="stretch-btn">
          <img src={stretchIcon} />
        </div>
      </Draggable>
      <Draggable
        axis="x"
        grid={[this.thirtyMin(endTime), 0]}
        bounds={{ left: startTime + 200, right: width }}
        position={{ x: endTime, y: 0 }}
        onDrag={(e, newValue) => this.setState({ endTime: newValue.x })}
      >
        <div className="stretch-btn">
          <img src={stretchIcon} />
        </div>
      </Draggable>
    </div>
  );
};

export default TimeSlot;
