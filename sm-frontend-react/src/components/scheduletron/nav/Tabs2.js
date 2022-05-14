import React, { Component } from "react";
import daysIcon from "../../../assets/images/Days Icon.svg";
import searchIcon from "../../../assets/images/Search Icon.svg";
import settingsIcon from "../../../assets/images/Settings Icon.svg";
import { Button } from "@mui/material";
import { Divider } from "@mui/material";

class Tabs2 extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const theTabs = [
      {
        src: daysIcon,
        label: "Days",
        index: 0,
      },
      {
        src: searchIcon,
        label: "Search",
        index: 1,
      },
      {
        src: settingsIcon,
        label: "Settings",
        index: 2,
      },
    ];

    const { classes } = this.props;
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
        {theTabs.map(({ index, label, src }) => {
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  opacity: active ? 1 : 0.5,
                }}
              >
                <img src={src} />
                <p style={active ? null : { visibility: "hidden" }}>{label}</p>
              </div>
            </Button>
          );
        })}
      </div>
    );
  }
}

export default Tabs2;
