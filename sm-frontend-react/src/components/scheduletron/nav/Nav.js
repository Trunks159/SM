import React, { Component } from "react";
import Tabs1 from "./Tabs1";
import Tabs2 from "./Tabs2";
import "./nav.css";
import { touchRippleClasses } from "@mui/material";
import WeekBar from "../WeekBar";

class Nav extends Component {
  state = {
    menu: null,
  };

  changeMenu = (menuTitle) => {
    menuTitle = this.state.menu === menuTitle ? null : menuTitle;
    this.props.adjustMarginLeft(menuTitle ? 230 : 100);
    this.setState({ menu: menuTitle });
  };

  render() {
    const { dayId, selected, setDay } = this.props;
    const { menu } = this.state;
    return (
      <div
        style={{
          display: "flex",
          position: "fixed",
          top: 65,
          bottom: 0,
        }}
      >
        <div className="side-nav">
          <Tabs1 dayId={dayId} />
          <Tabs2
            dayId={dayId}
            changeMenu={this.changeMenu}
            selected={selected}
          />
        </div>
        {menu === "weekbar" && <WeekBar week={selected.week} setDay={setDay} />}
        {menu === "search" && <div style={{ gridColumn: "2 / 3" }}>Search</div>}
        {menu === "settings" && (
          <div style={{ gridColumn: "2 / 3" }}>Search</div>
        )}
      </div>
    );
  }
}

export default Nav;
