import React, { Component } from "react";
import schedulerIcon from "../../../assets/images/Scheduler Icon.svg";
import openIcon from "../../../assets/images/Open Icon.svg";
import { Divider } from "@mui/material";
import { NavLink } from "react-router-dom";

class Tabs2 extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const { classes, path, dayId } = this.props;
    const theTabs = [
      {
        src: openIcon,
        label: "Open",
        index: 0,
        link: path,
      },
      {
        src: schedulerIcon,
        label: null,
        index: 1,
        link: `${path}/${dayId}`,
      },
    ];

    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "auto",
        }}
      >
        <Divider style={{ width: "90%", background: "#71828B", height: 0.5 }} />
        {/*theTabs.map(({ index, label, src, link = null }) => {
          const active = this.state.value === index;
          return (
            <Button
              style={{
                color: "white",
                padding: "0px",
                width: "100%",
                borderRadius: 0,
                position: "relative",
                paddingTop: 15,
              }}
              sx={{
                textTransform: "none",
                fontSize: 9,
                fontWeight: "bold",
              }}
              onClick={(e) => this.handleChange(e, index)}
            >
              <Divider
                style={{
                  opacity: active ? 1 : 0,
                  position: "absolute",
                  background: "white",
                  width: 2,
                  height: "100%",
                  right: 0,
                  transition: "opacity .5s",
                }}
              />
              {link ? (
                <NavLink
                  to={path}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    opacity: active ? 1 : 0.5,
                  }}
                >
                  <img src={src} />
                  <p style={active ? null : { visibility: "hidden" }}>
                    {label}
                  </p>
                </NavLink>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    opacity: active ? 1 : 0.5,
                  }}
                >
                  <img src={src} />
                  <p style={active ? null : { visibility: "hidden" }}>
                    {label}
                  </p>
                </div>
              )}
            </Button>
          );
        })*/}


              <NavLink
                to={path}
                className={"nav-link" + (this.state.value === 0 ? " active" : " inactive")}
              >
                <img alt="Open" src={openIcon} />
                <p>Open</p>
                <Divider
                  style={{
                    opacity: this.state.value === 0 ? 1 : 0,
                    position: "absolute",
                    background: "white",
                    width: 2,
                    height: "100%",
                    right: 0,
                    transition: "opacity .5s",
                  }}
                />
              </NavLink>
              <NavLink
                to={path}
                className={"nav-link" + (this.state.value === 1 ? " active" : " inactive")}
              >
                <img alt="Scheduler" src={schedulerIcon} />
                <p>{null}</p>
                <Divider
                  style={{
                    opacity: this.state.value === 1 ? 1 : 0,
                    position: "absolute",
                    background: "white",
                    width: 2,
                    height: "100%",
                    right: 0,
                    transition: "opacity .5s",
                  }}
                />
              </NavLink>
            
          

      </div>
    );
  }
}

export default Tabs2;
