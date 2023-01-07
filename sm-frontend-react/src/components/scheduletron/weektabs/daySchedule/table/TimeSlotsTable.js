import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Button,
} from "@mui/material";
import TimeLine from "./TimeLine";
import { useDispatch, useSelector } from "react-redux";
import "./timeslots.css";
import TimeSlot from "./TimeSlot";
import UserMenu from "./UserMenu";
import removeIcon from "./assets/Close Icon.svg";

//ACTIONS
const removeFromScheduled = (userId) => ({
  type: "REMOVE_FROM_SCHEDULED",
  payLoad: userId,
});

function MyTable() {
  const dispatch = useDispatch();
  const currentSchedule = useSelector((state) => state.currentSchedule);
  const { timeslots } = currentSchedule;


  function handleRemove(e, index) {
    dispatch(removeFromScheduled(index));
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
                  <Button
                    onClick={() => handleRemove(index)}
                    to="/"
                    startIcon={
                      <img alt="remove team member" src={removeIcon} />
                    }
                  >
                    <img src={removeIcon} alt="removeUser" />
                  </Button>
                  <UserMenu user={user} index={index} />
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
                    <TimeSlot timeslot={timeslot} index={index} />
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
