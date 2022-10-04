import React from "react";
import saveIcon from "./assets/Save Icon.svg";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { pixToTime } from "../../TimeFunctions";

const SavePrompt = ({ index, currentFunction }) => {
  const dispatch = useDispatch();
  const timeslots = useSelector((state) => state.timeslots);
  const handleSave = () => {
    //convert the pixels to times, send objects to python
  };

  return (
    <div
      className="save-prompt"
      style={{ display: currentFunction === index ? "flex" : "none" }}
    >
      <h2>Completion Status</h2>
      <ul>
        <li>
          <h3>Staffing</h3>
          <caption>6/10</caption>
          <p>Shift has been staffed to minimum requirements</p>
        </li>

        <li>
          <h3>Availability Violations</h3>
          <caption>2</caption>
          <p>Only 2 availability violations found</p>
        </li>
      </ul>
      <Button
        style={{
          background: "#54F2D1",
          textTransform: "none",
          color: "white",
          width: 114,
          height: 36,
          borderRadius: 4,
        }}
        onClick={handleSave}
        endIcon={<img src={saveIcon} />}
      >
        Save
      </Button>
    </div>
  );
};

export default SavePrompt;
