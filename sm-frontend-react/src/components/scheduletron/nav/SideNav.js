import React, { Component } from "react";
import Tabs1 from "./Tabs1";
import Tabs2 from "./Tabs2";
import "./nav.css";
import { Collapse, Paper, touchRippleClasses } from "@mui/material";
import WeekBar from "./WeekBar";

class SideNav extends Component {
  state = {
    menu: null,
  };

  changeMenu = (menuTitle) => {
    menuTitle = this.state.menu === menuTitle ? null : menuTitle;
    this.setState({ menu: menuTitle });
  };

  render() {
    const { selectedWeek } = this.props;
    const { menu } = this.state;
    console.log("Menu: ", selectedWeek);
    return (
      <>
        <div className="placeholder-nav"></div>
        <div className="side-navbar" style={{}}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 70,
              background: "#51636D",
            }}
          >
            <Tabs1 dayIndex={0} weekId={selectedWeek && selectedWeek.id} />
            <Tabs2 changeMenu={this.changeMenu} selectedWeek={selectedWeek} />
          </div>

          <Collapse in={Boolean(menu)} orientation={"horizontal"}>
            <div
              style={{
                position: "absolute",
                left: 70,
                right: 0,
                top: 0,
                bottom: 0,
                background: "red",
              }}
            >
              {selectedWeek && (
                <WeekBar hidden={menu === "weekbar"} week={selectedWeek.week} />
              )}

              <div hidden={menu === "search"}>Search</div>
              <div hidden={menu === "settings"}>Settings</div>
            </div>
          </Collapse>
        </div>
      </>
    );
  }
}

export default SideNav;
