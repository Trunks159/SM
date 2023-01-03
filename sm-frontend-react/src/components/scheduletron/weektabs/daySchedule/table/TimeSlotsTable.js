import React, { useEffect, useRef } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";
import { Paper } from "@material-ui/core";
import Draggable from "react-draggable";
import TimeLine from "./TimeLine";
import stretchIcon from "./assets/Stretch Icon.svg";
import { useDispatch, useSelector } from "react-redux";
import "./timeslots.css";
import moment from "moment";

//ACTIONS

const updateTime = ({ newValue, timeframe, index }) => ({
  type: "UPDATE_TIME",
  payLoad: { newValue, timeframe, index },
});

//PURE FUNCTIONS

function MyTable() {
  //UTILITIES
  const dispatch = useDispatch();
  //program wont refresh on change to height without this

  //GLOBAL STATE
  const currentSchedule = useSelector((state) => state.currentSchedule);
  const { trackLength, timeslots } = currentSchedule;

  //SIDEEFFECTS

  function handleDrag(newValue, timeframe, index) {
    /*This is mostly because of the rounding errors
    const time = pixToTime(newValue, trackWidth, timerange).format();
    const trueValue = roundIt(time);
    const pix = trueValue
      ? timeToPix(trueValue, trackWidth, timerange)
      : newValue;

    dispatch(
      updateTime({
        timeframe,
        newVal: pix,
        index,
      })
    );
    */

    //update time in redux
    dispatch(
      updateTime({
        timeframe,
        newValue: newValue,
        index,
      })
    );
  }

  return (
    <div style={{ flex: 1, position: "relative" }}>
      <TableContainer
        sx={{ position: "absolute", right: 0, left: 0, top: 0, bottom: 0 }}
      >
        <Table
          style={{
            height: "100%",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  background: "blue",
                  position: "sticky",
                  zIndex: 1,
                  minWidth: 30,
                }}
              >
                {"  "}
              </TableCell>
              {timeslots.map(({ user }, index) => (
                <TableCell
                  key={index}
                  style={{
                    width: 140,
                    minWidth: 140,
                    textTransform: "capitalize",
                  }}
                >
                  {user.firstName} {user.lastName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                style={{
                  position: "sticky",
                  left: 0,
                  background: "rgba(245, 245, 245, .5)",
                  borderRadius: "0px 7px 7px 0px",
                  zIndex: 1,
                  padding: "0px 10px",
                }}
              >
                <TimeLine shiftFilter={{ day: true, night: true }} />
              </TableCell>
              {timeslots.length > 0 &&
                timeslots.map((timeslot, index) => {
                  const { startTime, endTime } =
                    currentSchedule.toWorkBlock(timeslot);
                  return (
                    <TableCell
                      key={index}
                      style={{
                        borderRight: "rgba(112, 112, 112, .14)",
                        background: "orange",
                      }}
                    >
                      <div
                        className="timeslot-track"
                        style={{
                          height: trackLength,
                        }}
                      >
                        <Paper
                          style={{
                            position: "absolute",
                            top: timeslot.start,
                            bottom:
                              trackLength - timeslot.end < 0
                                ? 0
                                : trackLength - timeslot.end,
                            right: 10,
                            left: 10,
                            textTransform: "uppercase",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          Start :{moment(startTime).format("h:mm a")}
                          End : {trackLength}
                        </Paper>

                        <Draggable
                          axis={"y"}
                          position={{ x: 0, y: timeslot.start }}
                          bounds={{ top: 0, bottom: timeslot.end - 200 }}
                          onDrag={(e, newValue) =>
                            handleDrag(newValue.y, "start", index)
                          }
                        >
                          <div className="stretch-btn">
                            <img
                              alt="Stretch1"
                              style={{ rotate: "90deg" }}
                              src={stretchIcon}
                            />
                          </div>
                        </Draggable>
                        <Draggable
                          axis={"y"}
                          position={{ x: 0, y: timeslot.end }}
                          bounds={{
                            top: timeslot.start + 200,
                            bottom: currentSchedule.trackLength,
                          }}
                          onDrag={(e, newValue) =>
                            handleDrag(newValue.y, "end", index)
                          }
                        >
                          <div className="stretch-btn">
                            <img
                              alt="Stretch2"
                              style={{ rotate: "90deg" }}
                              src={stretchIcon}
                            />
                          </div>
                        </Draggable>
                      </div>
                    </TableCell>
                  );
                })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MyTable;
