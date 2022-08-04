import React, { Component } from "react";
import Draggable from "react-draggable";
import stretchIcon from "./assets/Stretch Icon.svg";
import { Paper } from "@material-ui/core";

class TimeSlot extends Component {
  state = {
    leftStretchBtn: 0,
    rightStretchBtn: 200,
  };
  render() {
    const { leftStretchBtn, rightStretchBtn } = this.state;
    return (
      <div style={{ background: "red", position: "relative" }}>
        <Paper
          className="timeslot"
          style={{
            width: rightStretchBtn - leftStretchBtn,
            marginLeft: leftStretchBtn + 10,
            minWidth: 200,
            height: 55,
          }}
        >
          Jordan Bless startTime : {leftStretchBtn}, endtime: {rightStretchBtn}
          <Draggable
            axis="x"
            grid={[25, 0]}
            position={{ x: leftStretchBtn, y: 0 }}
            bound={{ left: 0 }}
            onDrag={(e, y) => {
              if (rightStretchBtn - y.x < 200) {
                console.log("Error, too small");
                return null;
              }
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
        </Paper>
      </div>
    );
  }
}

export default TimeSlot;
