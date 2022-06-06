import React, { Component } from "react";
import scheduleIcon from "../../../assets/images/Schedule Icon.svg";
import openIcon from "../../../assets/images/Open Icon.svg";
import { Divider, Tooltip } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

const withLocation = (WhateverComponent) => {
  return (props) => <WhateverComponent location={useLocation()} {...props} />;
};

class Tabs1 extends Component {
  state = {
    value: this.props.location.pathname,
  };

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ value: this.props.location.pathname });
    }
  };

  render() {
    const { dayId, location } = this.props;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <NavLink to={"/scheduletron"} className={"nav-link"}>
          <img
            className={`jordan ${
              this.state.value === "/scheduletron" ? "active" : "inactive"
            }`}
            alt="Open"
            src={openIcon}
          />
          <p style={{ opacity: this.state.value === "/scheduletron" ? 1 : 0 }}>
            Open
          </p>
          <Divider
            style={{
              opacity: this.state.value === "/scheduletron" ? 1 : 0,
              position: "absolute",
              background: "white",
              width: 2,
              height: "100%",
              right: 0,
              transition: "opacity .25s",
              top: 0,
            }}
          />
        </NavLink>
        <NavLink to={`/scheduletron/${dayId}`} className={"nav-link"}>
          <img
            className={`jordan ${
              this.state.value !== "/scheduletron" ? "active" : "inactive"
            }`}
            alt="Open"
            src={scheduleIcon}
          />
          <p style={{ opacity: this.state.value !== "/scheduletron" ? 1 : 0 }}>
            Actual Schedule
          </p>
          <Divider
            style={{
              opacity: this.state.value !== "/scheduletron" ? 1 : 0,
              position: "absolute",
              background: "white",
              width: 2,
              height: "100%",
              right: 0,
              transition: "opacity .25s",
              top: 0,
            }}
          />
        </NavLink>
      </div>
    );
  }
}

export default withLocation(Tabs1);
