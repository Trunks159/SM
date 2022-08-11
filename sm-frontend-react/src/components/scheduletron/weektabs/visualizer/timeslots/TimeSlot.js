import React, { Component } from "react";
import Draggable from "react-draggable";
import stretchIcon from "./assets/Stretch Icon.svg";
import { Paper } from "@material-ui/core";
import {
  timeToPixels,
  floatToString,
  miliToReg,
  percToFloat,
  arrayOfDates,
} from "../../../../TimeFunctions";

class TimeSlot extends Component {
  myRef = React.createRef();

  state = {
    startTime: { pix: 0, hours: this.props.startTime },
    endTime: { pix: 200, hours: this.props.endTime },
    width: 0,
  };

  roundIt = (newValue, width, timerange) => {
    let a = arrayOfDates.map((item) =>
      timeToPixels(item.getHours() + item.getMinutes() / 60, width, timerange)
    );
    let difference = Math.abs( newValue - a[0]);
    let found = null;
    for (let i = 1; i < a.length(); i++) {
      if( difference > Math.abs( newValue - a[i]) ) {
        difference = Math.abs( newValue - a[i])
        found = i;
      }  
    }
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

  thirtyMin = (timerange, width) =>
    width / ((timerange[1] - timerange[0]) / 0.5);

  componentDidMount = () => {
    const { startTime, endTime, availableTimes } = this.props;
    const width = this.myRef.current.parentElement.clientWidth;
    this.setState({
      width: width,
      startTime: {
        ...this.state.startTime,
        pix: timeToPixels(startTime, width, availableTimes),
      },
      endTime: {
        ...this.state.endTime,
        pix: timeToPixels(endTime, width, availableTimes),
      },
    });
  };

  handleDrag = (newValue, propName) => {
    let time = this.state[propName];
    let value = null;
    if (newValue > time.pix) {
      value = time.hours + 0.5;
    } else if (newValue < time.pix) {
      value = time.hours - 0.5;
    } else {
      value = time.hours;
    }
    this.setState({ [propName]: { pix: newValue, hours: value } });
  };

  render() {
    const { startTime, endTime, width } = this.state;
    const { availableTimes, user } = this.props;
    const thirtyMin = this.thirtyMin(availableTimes, width);
    return (
      <div ref={this.myRef} style={{ position: "relative" }}>
        <Paper
          className="timeslot"
          style={{
            width: endTime.pix - startTime.pix,
            marginLeft: startTime.pix + 20,
            minWidth: 200,
            height: 55,
          }}
        >
          {user.firstName} {user.lastName} startTime :
          {this.pixToString(startTime.pix, width, availableTimes)}, endtime:
          {this.pixToString(endTime.pix, width, availableTimes)}
        </Paper>
        <Draggable
          axis="x"
          grid={[thirtyMin, 0]}
          position={{ x: startTime.pix, y: 0 }}
          bounds={{ left: 0, right: endTime.pix - 200 }}
          onDrag={(e, newValue) => this.handleDrag(newValue.x, "startTime")}
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
          grid={[thirtyMin, 0]}
          bounds={{ left: startTime.pix + 200, right: width }}
          position={{ x: endTime.pix, y: 0 }}
          onDrag={(e, newValue) => this.handleDrag(newValue.x, "endTime")}
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
