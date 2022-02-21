import React, { Component } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Button } from "@material-ui/core";
import { Collapse } from "@material-ui/core";
import expandIcon from "../../../assets/images/Expand Icon.svg";

class Actions extends Component {
  state = {
    collapse: true,
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          background: "rgba(151, 151, 151, .78)",
          maxWidth: "100%",
          width: 250,
          borderRadius: "7px 0px 0px 7px",
          position: "absolute",
          bottom: 0,
          right: 0,
          height: 85,
        }}
      >
        <Button
          onClick={() => {
            this.setState({ collapse: !this.state.collapse });
          }}
        >
          <img
            style={{ transform: "rotate(90deg)", marginRight: "auto" }}
            src={expandIcon}
          />
        </Button>
        <Collapse in={this.state.collapse}>
          <Button>Stuff</Button>
        </Collapse>
      </div>
    );
  }
}

export default Actions;
