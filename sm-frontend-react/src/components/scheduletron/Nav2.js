import React, { Component } from "react";
import scheduleIcon from "../../assets/images/Schedule Icon White.svg";
import settingsIcon from "../../assets/images/Settings Icon.svg";
import searchIcon from "../../assets/images/Search Icon.svg";
import logo from "../../assets/images/Logo.svg";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { AppBar, Toolbar } from "@mui/material";

class Nav2 extends Component {
  state = {
    value: 0,
  };

  render() {
    const { path, dayId } = this.props;
    const theTabs = [
      {
        src: scheduleIcon,
        label: "Schedules",
        link: path,
      },
      {
        src: searchIcon,
        label: "Search",
      },
      {
        src: settingsIcon,
        label: "Settings",
      },
      {
        src: logo,
        label: null,
        link: `${path}/${dayId}`,
      },
    ];
    return (
      <nav style={{ background: "#51636D" }}>
        {theTabs.map((t, index) => {
          const active = this.state.value === index;
          return (
            <div style={{ color: "white", opacity: active ? 1 : 0.5 }}>
              {t.link ? (
                <Link to={t.link}>
                  <img src={t.src} />
                </Link>
              ) : (
                <img src={t.src} />
              )}
            </div>
          );
        })}
      </nav>
    );
  }
}

export default Nav2;
