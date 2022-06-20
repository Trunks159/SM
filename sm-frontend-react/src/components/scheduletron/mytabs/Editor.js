import { Button } from "@material-ui/core";
import React, { Component } from "react";
import Divider from "@mui/material/Divider";
import addIcon from "../../../assets/images/Add Icon.svg";

class Editor extends Component {
  state = {};
  render() {
    const team = ["Jordan Giles", "Bob Marley"];
    return (
      <div
        style={{
          background: "orange",
          padding: 1000,
        }}
      >
        Um
        {/*<div>
          <p>Available Team Members</p>
          <Divider />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              justifyItems: "center",
              margin: 10,
              boxSizing: "border-box",
              background: "red",
              flex: 1,
            }}
          >
            {team &&
              team.map((person) => (
                <Button
                  style={{
                    borderRadius: 7,
                    background: "white",
                    textTransform: "none",
                    fontSize: 11,
                    padding: 10,
                  }}
                >
                  {person}
                </Button>
              ))}
          </div>
        </div>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ height: "100%", background: "red" }}
        >
          <Button startIcon={<img alt="" src={addIcon} />} />
        </Divider>
        <div style={{ flex: 1 }}>
          <p>Scheduled Team Members</p>
          <Divider />
                </div>*/}
      </div>
    );
  }
}

export default Editor;
