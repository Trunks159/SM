import React, { Component } from "react";
import dayIcon from "../../assets/images/Day Icon.svg";
import nightIcon from "../../assets/images/Night Icon.svg";
import { Divider, Button } from "@material-ui/core";

class Toolbar extends Component {
  state = {
    activeDayNight: 0,
  };

  handleDayNight = (index) => {};

  render() {
    return (
      <div className={"schedule-toolbar"}>
        <Button
          onClick={() => this.handleDayNight(0)}
          style={{
            height: "100%",
            position: "relative",
            margin: 0,
            padding: 0,
            border: "none",
            background: "none",
          }}
        >
          <img src={dayIcon} alt="/" />
          <Divider
            className="active-indicator"
            style={{
              background: "#275C78",
              opacity: this.state.activeDayNight === 0 ? 1 : 0,
            }}
          />
        </Button>
      </div>
    );
  }
}

export default Toolbar;
