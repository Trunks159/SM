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
import TimeLine from "../components/scheduletron/weektabs/daySchedule/table/TimeLine";
import stretchIcon from "./assets/Stretch Icon.svg";
import { useDispatch, useSelector } from "react-redux";
import useWindowDimensions from "../components/scheduletron/weektabs/daySchedule/table/WindowDimensions";
import "./timeslots.css";

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
  const c = myRef.current && myRef.current.clientHeight;
  console.log("Moms: ", c);
  /*
  useEffect(() => {
    dispatch(updateTrackLength(myRef.current.clientHeight));
  }, [viewportHeight]);
*/

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
              {timeslots &&
                timeslots.map(({ start, end }, index) => (
                  <TableCell
                    key={index}
                    style={{
                      borderRight: "rgba(112, 112, 112, .14)",
                      position: "relative",
                    }}
                  >
                    <Paper
                      style={{
                        position: "absolute",
                        top: start,
                        bottom: trackLength - end,
                        right: 10,
                        left: 10,
                      }}
                    >
                      Start : {start}
                      End : {trackLength}
                    </Paper>
                    <Draggable axis={"y"} position={{ x: 0, y: start }}>
                      <div className="stretch-btn">
                        <img
                          alt="Stretch1"
                          style={{ rotate: "90deg" }}
                          src={stretchIcon}
                        />
                      </div>
                    </Draggable>
                    <Draggable axis={"y"} position={{ x: 0, y: end }}>
                      <div style={{ background: "black" }}>
                        <img
                          alt="Stretch2"
                          style={{ rotate: "90deg" }}
                          src={stretchIcon}
                        />
                      </div>
                    </Draggable>
                  </TableCell>
                ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MyTable;
