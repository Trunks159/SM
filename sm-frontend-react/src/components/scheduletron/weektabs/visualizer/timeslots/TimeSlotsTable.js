import React, { useEffect, useRef, useState } from "react";
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
import TimeLine from "../TimeLine";
import stretchIcon from "./assets/Stretch Icon.svg";

function MyTable() {
  const timeslots = [
    { firstName: "Jordan", lastName: "Bless", start: 200, end: 300 },
    { firstName: "Bob", lastName: "Marley", start: 0, end: 400 },
    { firstName: "Bob", lastName: "Marley", start: 0, end: 400 },
    { firstName: "Bob", lastName: "Marley", start: 0, end: 400 },
    { firstName: "Bob", lastName: "Marley", start: 0, end: 400 },
    { firstName: "Bob", lastName: "Marley", start: 0, end: 400 },
    { firstName: "Bob", lastName: "Marley", start: 0, end: 400 },
    { firstName: "Bob", lastName: "Marley", start: 0, end: 400 },
    { firstName: "Bob", lastName: "Marley", start: 0, end: 400 },
    { firstName: "Bob", lastName: "Marley", start: 0, end: 400 },
    { firstName: "Bob", lastName: "Marley", start: 0, end: 400 },
    { firstName: "Bob", lastName: "Marley", start: 0, end: 400 },
    { firstName: "Bob", lastName: "Marley", start: 0, end: 400 },
    { firstName: "Bob", lastName: "Marley", start: 0, end: 400 },
  ];
  const myRef = useRef(null);
  //initialize width
  const _trackWidth = myRef.current ? myRef.current.clientHeight : 0;

  return (
    <TableContainer sx={{ flex: 1, minWidth: 100, width: 100 }}>
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
            {timeslots.map(({ firstName, lastName }) => (
              <TableCell style={{ width: 140, minWidth: 140 }}>
                {firstName} {lastName}
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
              <TimeLine shiftFilter={{ day: true, night: true }} />
            </TableCell>
            {_trackWidth > 0 &&
              timeslots.map(({ start, end }) => (
                <TableCell
                  style={{
                    borderRight: "rgba(112, 112, 112, .14)",
                    position: "relative",
                  }}
                >
                  <Paper
                    style={{
                      position: "absolute",
                      top: start,
                      bottom: 0,
                      right: 10,
                      left: 10,
                    }}
                  >
                    Start : {start}
                    End : {_trackWidth}
                  </Paper>
                  <Draggable
                    axis={"y"}
                    position={{ x: 0, y: start }}
                    style={{}}
                  >
                    <div className="stretch-btn">
                      <img style={{ rotate: "90deg" }} src={stretchIcon} />
                    </div>
                  </Draggable>
                </TableCell>
              ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MyTable;
