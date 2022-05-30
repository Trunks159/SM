import React, { Component } from "react";
import Tabs1 from "./Tabs1";
import Tabs2 from "./Tabs2";
import "./nav.css";
import { Paper, touchRippleClasses } from "@mui/material";
import WeekBar from "../WeekBar";

class SideNav extends Component {
  state = {
    menu: null,
  };

  changeMenu = (menuTitle) => {
    menuTitle = this.state.menu === menuTitle ? null : menuTitle;
    this.setState({ menu: menuTitle });
  };

  render() {
    const { dayId, selected, setDay } = this.props;
    const { menu } = this.state;
    return (
      <>
        <nav className="placeholder-nav"></nav>
        <div className="side-navbar">
          <Tabs1 dayId={dayId} />
          <Tabs2
            dayId={dayId}
            changeMenu={this.changeMenu}
            selected={selected}
          />
          {menu === "weekbar" && (
            <WeekBar week={selected.week} setDay={setDay} />
          )}
          {menu === "search" && (
            <div style={{ gridColumn: "2 / 3" }}>Search</div>
          )}
          {menu === "settings" && (
            <div style={{ gridColumn: "2 / 3" }}>Search</div>
          )}
        </div>
      </>
    );
  }
}

export default SideNav;
