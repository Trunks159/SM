import React from "react";
import addIcon from "./assets/Add Icon.svg";
import editIcon from "./assets/Edit Icon.svg";
import { Button } from "@mui/material";
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

function RequestOffs({ requestOffs, handleSave }) {
  return (
    <form className="request-offs">
      <h2 className="header">Request Offs</h2>
      <p className="help-text">This is where you can request off for any set of time.</p>
      <div className="bordered-container">
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
      <SaveButton onClick={() => handleSave()} />
    </form>
  );
}

export default RequestOffs;
