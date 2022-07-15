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
    const { dayId, selectedWeek } = this.props;
    const { menu } = this.state;
    return (
      <>
        <div className="placeholder-nav"></div>
        <div className="side-navbar">
          <Tabs1 dayId={dayId} />
          <Tabs2
            dayId={dayId}
            changeMenu={this.changeMenu}
            selectedWeek={selectedWeek}
          />
          <Collapse in={Boolean(menu)}>
            {selectedWeek && (
              <WeekBar hidden={menu === "weekbar"} week={selectedWeek.week} />
            )}

            <div hidden={menu === "search"}>Search</div>
            <div hidden={menu === "settings"}>Settings</div>
          </Collapse>
        </div>
      </>
    );
  }
}

export default SideNav;
