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
import useWindowDimensions from "./WindowDimensions";
import "./timeslots.css";
import moment from "moment";

//ACTIONS
const updateTrackLength = (newLength) => ({
  type: "UPDATE_TRACK_LENGTH",
  payLoad: newLength,
});

const initializeTimeslots = ({ trackLength, scheduled }) => ({
  type: "INITIALIZE_TIMESLOTS",
  payLoad: { trackLength, scheduled },
});

//PURE FUNCTIONS

function MyTable() {
  //UTILITIES
  const myRef = useRef(null);
  const dispatch = useDispatch();
  //program wont refresh on change to height without this
  const dimensions = useWindowDimensions();
  const _track_length = myRef.current && myRef.current.clientHeight;

  //GLOBAL STATE
  const currentSchedule = useSelector((state) => state.currentSchedule);
  const { trackLength, timeslots, scheduled } = currentSchedule;

  //SIDEEFFECTS
  useEffect(() => {
    dispatch(
      initializeTimeslots({
        trackLength: myRef.current.clientHeight,
        scheduled: scheduled,
      })
    );
  }, [scheduled]);

  useEffect(() => {
    dispatch(updateTrackLength(_track_length));
  }, [_track_length]);

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
          <TableBody ref={myRef}>
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
                <TimeLine
                  ref={myRef}
                  shiftFilter={{ day: true, night: true }}
                />
              </TableCell>
              {timeslots.length > 0 &&
                timeslots.map((timeslot, index) => {
                  const { startTime, endTime } =
                    currentSchedule.convertTimeslot(timeslot.user.id);
                  return (
                    <TableCell
                      key={index}
                      style={{
                        borderRight: "rgba(112, 112, 112, .14)",
                        background: "orange",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          margin: 20,
                          top: 0,
                          bottom: 0,
                          right: 0,
                          left: 0,
                          background: "yellow",
                        }}
                      >
                        <Paper
                          style={{
                            position: "absolute",
                            top: timeslot.start,
                            bottom: trackLength - timeslot.end,
                            right: 10,
                            left: 10,
                            textTransform: "uppercase",
                          }}
                        >
                          Start :{moment(startTime).format("h:mm a")}
                          End : {moment(endTime).format("h:mm a")}
                        </Paper>

                        <Draggable
                          axis={"y"}
                          position={{ x: 0, y: timeslot.start }}
                        >
                          <div className="stretch-btn" style={{}}>
                            <img
                              alt="Stretch1"
                              style={{ rotate: "90deg" }}
                              src={stretchIcon}
                            />
                          </div>
                        </Draggable>
                        <Draggable
                          axis={"y"}
                          position={{ x: 0, y: timeslot.end - 40 }}
                        >
                          <div
                            style={{
                              background: "black",
                              position: "absolute",
                            }}
                            className="stretch-btn"
                          >
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
