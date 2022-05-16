import React, { Component } from "react";
import schedulerIcon from "../../../assets/images/Scheduler Icon.svg";
import openIcon from "../../../assets/images/Open Icon.svg";
import { Divider } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

const withLocation = (WhateverComponent) => {
  return (props) => <WhateverComponent location={useLocation()} {...props} />;
};

const MyNavLink = ({ img, active, label, to = "/scheduletron" }) => {
  return (
    <NavLink
      to={to}
      className={"nav-link"}
      style={{ opacity: active ? 1 : 0.5 }}
    >
      <img alt="Open" src={img} />
      <p>{label}</p>
      <Divider
        style={{
          visibility: active ? "visible" : "hidden",
          position: "absolute",
          background: "white",
          width: 2,
          height: "100%",
          right: 0,
          transition: "opacity .3s",
          top: 0,
        }}
      />
    </NavLink>
  );
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
          flex: 1.75,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MyNavLink
          img={openIcon}
          active={this.state.value === "/scheduletron"}
          label="Open"
        />

        <MyNavLink
          img={schedulerIcon}
          active={this.state.value !== "/scheduletron"}
          to={`/scheduletron/${dayId}`}
        />
      </div>
    );
  }
}

export default withLocation(Tabs1);
