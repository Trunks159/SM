import React, { Component } from "react";
import Draggable from "react-draggable";
import stretchIcon from "./assets/Stretch Icon.svg";
import { Paper } from "@material-ui/core";
import {
  timeToPixels,
  miliToReg,
  percToFloat,
} from "../../../../TimeFunctions";

class TimeSlot extends Component {
  myRef = React.createRef();

  state = {
    startTime: 0,
    endTime: 200,
    width: 0,
  };

  convertDates = (dates, width, timerange) =>
    //Takes the date objects in an array and converts them
    //to an array of pixel values
    dates.map((item) =>
      timeToPixels(item.getHours() + item.getMinutes() / 60, width, timerange)
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

  pixToString = (pix, width, timerange) => {
    //pix to a percent, than a perc to hrs then hrs to date then date to string
    const perc = pix / width;
    const hrs = percToFloat(perc, timerange);
    const mins = (hrs - Math.floor(hrs)) * 60;

    let t = new Date();
    t.setHours(0, 0, 0, 0);
    t.setHours(Math.floor(hrs));
    t.setMinutes(mins);
    return miliToReg(t.toTimeString().slice(0, 5));
  };

  thirtyMin = (
    pix,
    width = this.state.width,
    timerange = this.props.availableTimes
  ) => {
    let hours = percToFloat(pix / width, timerange);
    hours = hours + 0.5;
    const pix2 = timeToPixels(hours, width, timerange);
    return pix2 - pix;
  };

  componentDidMount = () => {
    const { startTime, endTime, availableTimes } = this.props;
    const width = this.myRef.current.parentElement.clientWidth;
    this.setState({
      width: width,
      startTime: timeToPixels(startTime, width, availableTimes),
      endTime: timeToPixels(endTime, width, availableTimes),
    });
  };

  render() {
    const { startTime, endTime, width } = this.state;
    const { availableTimes, user } = this.props;
    console.log('Times: ', availableTimes)
    return (
      <div ref={this.myRef} style={{ position: "relative" }}>
        <Paper
          className="timeslot"
          style={{
            width: endTime - startTime,
            marginLeft: startTime + 20,
            minWidth: 200,
            height: 55,
          }}
        >
          {user.firstName} {user.lastName} startTime :
          {this.pixToString(startTime, width, availableTimes)}, endtime:
          {this.pixToString(endTime, width, availableTimes)}
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
