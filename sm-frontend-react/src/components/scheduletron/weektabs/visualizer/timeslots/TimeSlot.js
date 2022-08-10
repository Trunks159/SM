import React, { Component } from "react";
import Draggable from "react-draggable";
import stretchIcon from "./assets/Stretch Icon.svg";
import { Paper } from "@material-ui/core";
import { timeToPixels, floatToString } from "../../../../TimeFunctions";

class TimeSlot extends Component {
  myRef = React.createRef();

  state = {
    startTime: { pix: 0, hours: this.props.startTime },
    endTime: { pix: 200, hours: this.props.endTime },
    parentWidth: 0,
  };

  thirtyMin = (timerange, width) =>
    (0.5 / (timerange[1] - timerange[0])) * width;

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
          {floatToString(startTime.hours)}, endtime:
          {floatToString(endTime.hours)}
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
