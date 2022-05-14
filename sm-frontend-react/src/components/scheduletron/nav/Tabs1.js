import React, { Component } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import openIcon from "../../../assets/images/Open Icon.svg";
import schedulerIcon from "../../../assets/images/Scheduler Icon.svg";
import { Link } from "react-router-dom";

class Tabs1 extends Component {
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
        src: openIcon,
        label: "Schedules",
        link: path,
      },
      {
        src: schedulerIcon,
        label: null,
        link: `${path}/${dayId}`,
      },
    ];
    return (
      <Tabs
        style={{ flex: "max-content" }}
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

export default Tabs1;
