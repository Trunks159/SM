import React, { Component } from "react";
import daysIcon from "../../../assets/images/Days Icon.svg";
import searchIcon from "../../../assets/images/Search Icon.svg";
import settingsIcon from "../../../assets/images/Settings Icon.svg";
import { Button } from "@mui/material";
import { Divider } from "@mui/material";

class Tabs2 extends Component {
  state = {
    value: null,
  };

  handleChange = (event, newValue, menuTitle) => {
    this.props.changeMenu(menuTitle);
    if (this.state.value === newValue) {
      this.setState({ value: null });
    } else {
      this.setState({ value: newValue });
    }
  };

  handleDays = (e, newValue, menuTitle) =>
    this.props.selectedWeek && this.handleChange(e, newValue, menuTitle);

  render() {
    const theTabs = [
      {
        src: daysIcon,
        label: "Days",
        index: 0,
        menuTitle: "weekbar",
        handle: this.handleDays,
      },
      {
        src: searchIcon,
        label: "Search",
        index: 1,
        menuTitle: "search",
      },
      {
        src: settingsIcon,
        label: "Settings",
        index: 2,
        menuTitle: "settings",
      },
    ];

    const { classes } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "100%",
          height: 190,
          paddingTop: 10,
          marginTop: 10,
          borderTop: ".5px solid #71828B",
        }}
      >
        {theTabs.map(
          ({
            index,
            label,
            src,
            menuTitle,
            handle = (e) => this.handleChange(e, index, menuTitle),
          }) => {
            const active = this.state.value === index;
            return (
              <button
                className={`nav-button ${active ? "active" : "inactive"}`}
                onClick={(e) => handle(e, index, menuTitle)}
              >
                <Divider
                  style={{
                    opacity: active ? 1 : 0,
                    position: "absolute",
                    background: "#51636D",
                    width: 2,
                    height: "100%",
                    right: 0,
                    transition: "opacity .25s",
                  }}
                />

                <img src={src} />
                <p style={active ? null : { visibility: "hidden" }}>{label}</p>
              </button>
            );
          }
        )}
      </div>
    );
  }
}

export default Tabs2;
