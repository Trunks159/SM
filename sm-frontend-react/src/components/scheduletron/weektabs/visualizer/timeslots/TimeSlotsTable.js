import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Paper } from "@material-ui/core";
import Draggable from "react-draggable";

function MyTable() {
  const timeslots = [
    { firstName: "Jordan", lastName: "Bless", start: 200, end: 300 },
    { firstName: "Bob", lastName: "Marley", start: 0, end: 400 },
  ];
  const myRef = useRef(null);
  //initialize width
  const _trackWidth = myRef.current ? myRef.current.clientHeight : 0;

  return (
    <Table style={{ background: "red" }}>
      <TableHead>
        <TableRow>
          {timeslots.map(({ firstName, lastName }) => (
            <TableCell>
              {firstName} {lastName}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody style={{ background: "blue" }} ref={myRef}>
        {_trackWidth > 0 &&
          timeslots.map(({ start, end }) => (
            <TableCell
              style={{ borderRight: "2px solid black", position: "relative" }}
            >
              <Draggable axis={"y"} position={{ x: 0, y: start }}>
                <div style = {{background : 'yellow', width : 10, height : 10}}>1</div>
              </Draggable>
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
             
            </TableCell>
          ))}
      </TableBody>
    </Table>
  );
}

export default MyTable;
