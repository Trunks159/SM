import React, { Component } from "react";
import saveIcon from "./assets/Save Icon.svg";
import { Button } from "@mui/material";

class SavePrompt extends Component {
  state = {};
  render() {
    const { index, currentTab } = this.props;
    return (
      <div style={{ display: currentTab === index ? "flex" : "none" }}>
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
          endIcon={<img src={saveIcon} />}
        >
          Save
        </Button>
      </div>
    );
  }
}

export default SavePrompt;
