import React from "react";
import addIcon from "./assets/Add Icon.svg";
import editIcon from "./assets/Edit Icon.svg";
import { Button } from "@mui/material";
import SaveButton from "./SaveButton";

function RequestOffs({ requestOffs, handleSave }) {
  return (
    <div>
      <h2>Request Offs</h2>
      <p>This is where you can request off for any set of time.</p>
      <div className="upcoming-requests">
        <Button>View All</Button>
        <ol>
          {requestOffs.length ? (
            <div>Daydate and time restriction</div>
          ) : (
            <h3>No upcoming request offs</h3>
          )}
        </ol>
        <Button>
          <img src={editIcon} />
        </Button>
        <Button>
          <img src={addIcon} />
        </Button>
      </div>
      <SaveButton onClick={() => handleSave()} />
    </div>
  );
}

export default RequestOffs;
