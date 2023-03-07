import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Button,
  Box,
} from "@mui/material";
import TimeLine from "./TimeLine";
import { useDispatch, useSelector } from "react-redux";
import "./timeslots.css";
import TimeSlot from "./TimeSlot";
import UserPopover from "./UserPopover";
import removeIcon from "./assets/Close Icon.svg";
import styled from "@emotion/styled";

//ACTIONS
const removeFromScheduled = (userId) => ({
  type: "REMOVE_FROM_SCHEDULED",
  payLoad: userId,
});

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  width: "auto",
  position: "absolute",
  right: 0,
  left: 0,
  top: 0,
  bottom: 0,
  margin: "10px",

  [theme.breakpoints.up("md")]: {
    margin: "20px 80px 10px 10px",
  },
}));

const StyledBox = styled(Box)(() => ({
  flex: 1,
  position: "relative",
  "& h3": {
    color: "white",
    fontWeight: "500",
    background: "#546E7D",
    padding: "5px 10px",
    width: "max-content",
    position: "absolute",
    top: 0,
    left: 0,
    margin: 5,
    opacity: 0.8,
  },
  //watch out for this padding
}));

function MyTable({ date }) {
  const dispatch = useDispatch();
  const currentSchedule = useSelector((state) => state.currentSchedule);
  const { timeslots } = currentSchedule;
  const isReadOnly = currentSchedule.isReadOnly(date);

  function handleRemove(e, index) {
    dispatch(removeFromScheduled(index));
  }

  return (
    <StyledBox>
      {isReadOnly && <h3>Read Only</h3>}
      <StyledTableContainer>
        <Table
          style={{
            height: "100%",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  position: "sticky",
                  zIndex: 1,
                  minWidth: 30,
                }}
              >
                {/*Keep this empty */}
              </TableCell>
              {timeslots.map(({ user }, index) => (
                <TableCell
                  key={index}
                  style={{
                    width: 140,
                    minWidth: 140,
                    textTransform: "capitalize",
                    position: "relative",
                  }}
                >
                  <Button
                    disabled={isReadOnly}
                    onClick={() => handleRemove(index)}
                    to="/"
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      padding: 5,
                      minWidth: 0,
                    }}
                  >
                    <img src={removeIcon} alt="removeUser" />
                  </Button>
                  <UserPopover user={user} index={index} />
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
                timeslots.map((timeslot, index) => (
                  <TableCell
                    key={index}
                    style={{
                      borderRight: "rgba(112, 112, 112, .14)",
                    }}
                  >
                    <TimeSlot
                      timeslot={timeslot}
                      index={index}
                      isReadOnly={isReadOnly}
                    />
                  </TableCell>
                ))}
            </TableRow>
          </TableBody>
        </Table>
      </StyledTableContainer>
    </StyledBox>
  );
}

export default MyTable;
