import React, { Component } from "react";
import Draggable from "react-draggable";
import stretchIcon from "./assets/Stretch Icon.svg";
import { Paper, useRadioGroup } from "@material-ui/core";
import {
  timeToPixels,
  percToFloat,
  miliToReg,
} from "../../../../TimeFunctions";

class TimeSlot extends Component {
  myRef = React.createRef();

  state = {
    leftStretchBtn: 0,
    rightStretchBtn: 200,
    width: 0,
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
    (0.5 / (timerange[1] - timerange[0])) * width;

  roundIt = (timerange) => {
    /*need to round times to the closest 30 min
 so we first make an array with a ton of strings containing all the 30 min times
 so [3:00, 3:30, 4:00, ...]
 convert all of those to pix
 take the pix we have and get the closest value to the value in the array
  */
    let t = new Date();
    t.setHours(0, 0, 0, 0);
    let hours = Math.floor(timerange[0]);
    let mins = (hrs - Math.floor(hrs)) * 60;
    t.setHours;
  };

  componentDidMount = () => {
    const { workslot, availableTimes } = this.props;
    const [startTime, endTime] = workslot;
    const width = this.myRef.current.parentElement.clientWidth;
    this.setState({
      width: width,
      leftStretchBtn: timeToPixels(startTime, width, availableTimes),
      rightStretchBtn: timeToPixels(endTime, width, availableTimes),
    });
  };

  render() {
    const { leftStretchBtn, rightStretchBtn, width } = this.state;
    const { availableTimes, user } = this.props;
    const thirtyMin = this.thirtyMin(availableTimes, width);

    return (
      <div ref={this.myRef} style={{ position: "relative" }}>
        <Paper
          className="timeslot"
          style={{
            width: rightStretchBtn - leftStretchBtn,
            marginLeft: leftStretchBtn + 20,
            minWidth: 200,
            height: 55,
          }}
        >
          {user.firstName} {user.lastName} startTime :
          {this.pixToString(leftStretchBtn, width, availableTimes)}, endtime:
          {this.pixToString(rightStretchBtn, width, availableTimes)}
        </Paper>
        <Draggable
          axis="x"
          grid={[thirtyMin, 0]}
          position={{ x: leftStretchBtn, y: 0 }}
          bounds={{ left: 0, right: rightStretchBtn - 200 }}
          onDrag={(e, y) => {
            return this.setState({ leftStretchBtn: y.x });
          }}
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
          bounds={{ left: leftStretchBtn + 200, right: width }}
          position={{ x: rightStretchBtn, y: 0 }}
          onDrag={(e, y) => {
            if (y.x - leftStretchBtn < 200) {
              console.log("Error, too small");
              return null;
            }
            return this.setState({ rightStretchBtn: y.x });
          }}
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
