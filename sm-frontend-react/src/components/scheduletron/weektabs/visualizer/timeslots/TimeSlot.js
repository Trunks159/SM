import React, { Component } from "react";
import Draggable from "react-draggable";
import stretchIcon from "./assets/Stretch Icon.svg";
import { Paper } from "@material-ui/core";

class TimeSlot extends Component {
  myRef = React.createRef();

  state = {
    leftStretchBtn: 0,
    rightStretchBtn: 200,
    height: 0,
    width: 0,
  };

  componentDidMount = () => {
    this.setState({
      width: this.myRef.current.parentElement.clientWidth,
      height: this.myRef.current.parentElement.clientHeight,
    });
  };

  render() {
    const { leftStretchBtn, rightStretchBtn, height, width } = this.state;
    console.log("Height and width: ", height, width);
    return (
      <div ref = {this.myRef} style={{ position: "relative" }}>
        <Paper
          className="timeslot"
          style={{
            width: rightStretchBtn - leftStretchBtn,
            marginLeft: leftStretchBtn + 20,
            minWidth: 200,
            height: 55,
          }}
        >
          Jordan Bless startTime : {leftStretchBtn}, endtime: {rightStretchBtn}
        </Paper>
        <Draggable
          axis="x"
          grid={[25, 0]}
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
          grid={[25, 0]}
          bounds={{ left: leftStretchBtn + 200, right: width}}
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
