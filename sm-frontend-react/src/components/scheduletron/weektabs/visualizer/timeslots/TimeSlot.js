import React, { Component } from "react";
import Draggable from "react-draggable";
import stretchIcon from "./assets/Stretch Icon.svg";
import { Paper } from "@material-ui/core";
import moment from "moment";

class TimeSlot extends Component {
  myRef = React.createRef();

  state = {
    startTime: 0,
    endTime: 200,
    width: 0,
  };

  timeToPix = (time, width = this.state.width) => {
    const timerange = this.props.availableTimes.map((t) => moment(t));
    //Get from moment to a percentage, then multiply that by the width
    time = moment(time);
    const overflowLeft = time.diff(timerange[0], "hours", true) < 0;
    const overflowRight = time.diff(timerange[1], "hours", true) > 0;
    if (overflowLeft) {
      return 0;
    } else if (overflowRight) {
      return width;
    } else {
      const perc =
        time.diff(timerange[0], "hours", true) /
        timerange[1].diff(timerange[0], "hours", true);
      return perc * width;
    }
  };

  pixToTime = (
    pix,
    width = this.state.width,
    timerange = this.props.availableTimes
  ) => {
    timerange = timerange.map((t) => moment(t));
    return timerange[0].add(
      (pix / width) * timerange[1].diff(timerange[0], "hours", true),
      "hours"
    );
  };
  //take pix and spit out a moment, the inverse of the above method

  convertDates = (dates, width, timerange) =>
    //Takes the date objects in an array and converts them
    //to an array of pixel values
    dates.map((item) =>
      this.timeToPix(item.getHours() + item.getMinutes() / 60, width, timerange)
    );

  roundIt = (newValue, dates) => {
    let difference = Math.abs(newValue - dates[0]);
    let found = null;
    for (let i = 1; i < dates.length; i++) {
      if (difference > Math.abs(newValue - dates[i])) {
        difference = Math.abs(newValue - dates[i]);
        found = i;
      }
    }
    return dates[found];
  };

  pixToString = (pix) =>
    //pix to moment, then moment to string\
    this.pixToTime(pix).format("h:mm a");

  thirtyMin = (pix) => {
    //convert pix to time, add 30 min then convert back to pix
    const time = this.pixToTime(pix);
    const pix2 = this.timeToPix(time.add(30, "minutes"));
    return pix2 - pix;
  };

  componentDidMount = () => {
    const { startTime, endTime } = this.props;

    const width = this.myRef.current.parentElement.clientWidth;
    this.setState({
      width: width,
      startTime: this.timeToPix(startTime, width),
      endTime: this.timeToPix(endTime, width),
    });
  };

  //what methods
  //1 if check each time whether theres overflow, if so just cutoff the timeslot,
  //2. width = timerange[1] - end - start
  // if its negative, then
  // x= end - start, width = x - timerange[1],
  //alkternatively i could use left and right,
  // so left = startTime, left = timerange[1] - endtime

  render() {
    const { startTime, endTime, width } = this.state;
    const { user, availableTimes } = this.props;

    return (
      <div ref={this.myRef} style={{ position: "relative" }}>
        <Paper
          className="timeslot"
          style={{
            left: startTime,
            right: width - endTime < 0 ? 0 : width - endTime,
            minWidth: 200,
            height: 55,
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
            <img
              style={{
                width: 20,
                pointerEvents: "none",
              }}
              src={stretchIcon}
            />
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
            <img
              style={{
                width: 20,
                pointerEvents: "none",
              }}
              src={stretchIcon}
            />
          </div>
        </Draggable>
      </div>
    );
  }
}

export default TimeSlot;
