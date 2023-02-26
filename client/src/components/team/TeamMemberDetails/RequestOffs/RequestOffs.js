import React, { useState } from "react";
import addIcon from "./assets/Add Icon.svg";
import editIcon from "./assets/Edit Icon.svg";
import {
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import SaveButton from "../SaveButton";
import "./requestOffs.css";
import styled from "@emotion/styled";
import RequestCard from "./RequestCard";
import moment from "moment";

const StyledButton = styled(Button)({
  marginLeft: "auto",
  textTransform: "none",
  color: "#2B9DD9",
  fontWeight: "normal",
  fontSize: 11,
});

function RequestOffList({ requestOffs }) {
  return (
    <div>
      <StyledButton>View All</StyledButton>
      <ol>
        {requestOffs.length ? (
          requestOffs.map(({ start, end }, index) => (
            <li>
              <RequestCard start={moment(start)} end={moment(end)} />
            </li>
          ))
        ) : (
          <h3>No upcoming request offs</h3>
        )}
      </ol>
      <div className="actions">
        <Button>
          <img src={editIcon} />
        </Button>
        <Button>
          <img src={addIcon} />
        </Button>
      </div>
    </div>
  );
}

function AddRequestOff({ setCurrent }) {
  const [value, setValue] = useState("single");

  return (
    <form>
      <Button onClick={() => setCurrent("single")}>Back to request offs</Button>
      <ToggleButtonGroup
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
      >
        <ToggleButton value="single">One Day</ToggleButton>
        <ToggleButton value="multiple">Multiple Days</ToggleButton>
      </ToggleButtonGroup>
      <p>What day(s) would you like to request off for?</p>
      <TextField defaultValue={"2017-05-24"} />
    </form>
  );
}

function RequestOffs({ requestOffs, handleSave, isHidden }) {
  const [current, setCurrent] = useState("list");
  console.log("Hidden: ", isHidden);
  return (
    <form
      className="request-offs"
      style={{ display: isHidden ? "none" : "flex" }}
    >
      <h2 className="header">Request Offs</h2>
      <p className="help-text">
        This is where you can request off for any set of time.
      </p>
      <div className="bordered-container">
        {current === "list" ? (
          <RequestOffList requestOffs={requestOffs} />
        ) : (
          <AddRequestOff />
        )}
      </div>
      <SaveButton onClick={() => handleSave()} />
    </form>
  );
}

export default RequestOffs;
