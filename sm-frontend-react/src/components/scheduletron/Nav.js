import React, { Component } from "react";
import scheduleIcon from "../../assets/images/Schedule Icon White.svg";
import settingsIcon from "../../assets/images/Settings Icon.svg";
import searchIcon from "../../assets/images/Search Icon.svg";
import logo from "../../assets/images/Logo.svg";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

class Nav extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

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
      <Tabs
        style={{
          background: "#51636D",
          position: "absolute",
          height: "100%",
          width: 100,
        }}
        value={this.state.value}
        i
        onChange={this.handleChange}
        aria-label="basic tabs example"
        orientation="vertical"
        TabIndicatorProps={{
          style: {
            background: "white",
          },
        }}
      >
        {theTabs.map((t, index) => {
          const active = this.state.value === index;
          return (
            <Tab
              style={{ color: "white", opacity: active ? 1 : 0.5 }}
              icon={
                t.link ? (
                  <Link to={t.link}>
                    <img src={t.src} />
                  </Link>
                ) : (
                  <img src={t.src} />
                )
              }
              label={t.label}
              {...this.a11yProps(index)}
              sx={{
                textTransform: "none",
                fontSize: 9,
                fontWeight: "bold",
              }}
            />
          );
        })}
      </Tabs>
    );
  }
}

/*
const Nav = ({ path, dayId }) => {
  const classes = useStyles();
  return (
    <CustomTabs />
    <div
      style={{
        background: "#51636D",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 63,
      }}
    >
      <IconLink
        img={homeIcon}
        label={path === "/scheduletron" ? "Home" : null}
        to={path}
      />
      <IconLink
        img={scheduleIcon}
        label={path !== "/scheduletron" ? "Schedule" : null}
        to={path + `/${dayId}`}
      />
      <IconLink
        img={searchIcon}
        label={path !== "/scheduletron" ? "Schedule" : null}
        to={path + `/${dayId}`}
      />
      <Button
        classes={{ label: classes.label, root: classes.settings }}
        startIcon={
          <img
            alt=""
            style={{ marginLeft: 10, marginBottom: 5 }}
            src={settingsIcon}
          />
        }
      ></Button>
    </div>
  );
};
*/

export default Nav;
