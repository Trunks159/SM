import React, { Component } from "react";
import {
  timeToFloat,
  valueToFloat,
  miliToReg,
  valueToDt,
} from "../../../../TimeFunctions";
import TimeSlot from "./TimeSlot";
import "./timeslots.css";
import Draggable from "react-draggable";
import stretchIcon from "./assets/Stretch Icon.svg";
import { Button, Paper } from "@material-ui/core";

class TimeSlots extends Component {
  state = {
    draga: 0,
    dragb: 200,
  };

  getTimelineRange = ({ day, night }) => {
    if (day && night) {
      return ["6:00", "23:59"];
    } else if (day === true) {
      return ["6:00", "15:00"];
    }
    return ["15:00", "23:59"];
  };

  timeslotPosition = (availableTimes = [6, 15], workslot = [2, 17]) => {
    /*Returns marginleft and width of the timeslot and lets
      react know whether theres overflow or not
    */

    const availableTimesDiff = availableTimes[1] - availableTimes[0];
    const marginLeft = workslot[0] - availableTimes[0];
    const marginRight = availableTimes[1] - workslot[1];
    const overflowLeft = marginLeft < 0 ? Math.abs(marginLeft) : 0;
    const overflowRight = marginRight < 0 ? Math.abs(marginRight) : 0;
    const trueWidth = workslot[1] - workslot[0];
    const width = trueWidth - overflowLeft - overflowRight;
    const toPercentage = (item) => (item / availableTimesDiff) * 100 + "%";
    return {
      width: toPercentage(width),
      marginLeft: marginLeft < 0 ? "0%" : toPercentage(marginLeft),
      overflowLeft: overflowLeft !== 0,
      overflowRight: overflowRight !== 0,
      //if > 70% of the shift is within the current filter
      //display it
      hideSelf: width / trueWidth < 0.3,
    };
  };

  render() {
    const { workblocks, shiftFilter } = this.props;
    const { draga, dragb } = this.state;
    const timelineRange = this.getTimelineRange(shiftFilter);
    return (
      <div className="timeslots">
        <Draggable
          axis="x"
          defaultPosition={{ x: 200, y: 0 }}
          grid={[25, 0]}
          onDrag={(e, y) => {
            console.log("Change: ", this.state.dragb);
            return this.setState({ dragb: y.x });
          }}
        >
          <Button
            style={{
              position: "absolute",
              background: "rgba(24, 151, 230, .7)",
              borderRadius: 3,
              minWidth: 0,
              top: "35%",
              zIndex: 20,
            }}
          >
            <img style={{ width: 20 }} src={stretchIcon} />
          </Button>
        </Draggable>
        <Draggable
          axis="x"
          onDrag={(e, y) => {
            console.log("Change: ", this.state.draga);
            return this.setState({ draga: y.x });
          }}
          defaultPosition={{ x: 0, y: 0 }}
        >
          <Button
            style={{
              position: "absolute",
              background: "rgba(24, 151, 230, .7)",
              borderRadius: 3,
              minWidth: 0,
              top: "35%",
              zIndex: 20,
            }}
          >
            <img style={{ width: 20 }} src={stretchIcon} />
          </Button>
        </Draggable>

        <Paper
          style={{
            position: "absolute",
            top: "35%",
            zIndex: 19,
            width: dragb - draga,
            marginLeft: draga + 10,
            minWidth: 200,
            height: 55,
          }}
        >
          Jordan Bless startTime : {draga}, endtime: {dragb}
        </Paper>

        {workblocks.map((workblock) => {
          const availableTimes = timelineRange.map((av) => timeToFloat(av));
          const workslot2 = [
            workblock.startTime * 0.16,
            workblock.endTime * 0.16,
          ];

          const workslot = [
            valueToFloat(workblock.startTime),
            valueToFloat(workblock.endTime),
          ];

          const isBetween = (value, range) =>
            value > range[0] && value < range[1];
          return (
            //if the user works outside of the time range dont render them
            (isBetween(workslot[0], availableTimes) ||
              isBetween(workslot[1], availableTimes)) && (
              <TimeSlot
                availableTimes={availableTimes}
                workslot={workslot}
                shiftFilter={shiftFilter}
                user={workblock.user}
                startTime={miliToReg(
                  valueToDt(workblock.startTime).toTimeString().slice(0, 5)
                )}
                endTime={miliToReg(
                  valueToDt(workblock.endTime).toTimeString().slice(0, 5)
                )}
              />
            )
          );
        })}
      </div>
    );
  }
}

export default TimeSlots;
