import React, { Component } from "react";
import Tabs1 from "./Tabs1";
import Tabs2 from "./Tabs2";
import "./nav.css";
import NavMenu from "./navmenu/NavMenu";

class SideNav extends Component {
  state = {
    menu: null,
  };

  changeMenu = (e, newValue) => {
    console.log("Changes: ", newValue);
    this.setState({ menu: this.state.menu === newValue ? null : newValue });
  };

  render() {
    const { selectedWeek } = this.props;
    const { menu } = this.state;
    console.log("Menu: ", menu);
    return (
      <>
        <div className="placeholder-nav"></div>
        <div className="side-navbar">
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
            <Tabs2
              changeMenu={this.changeMenu}
              selectedWeek={selectedWeek}
              menu={menu}
            />
          </div>
          <NavMenu
            selectedWeek={selectedWeek}
            menu={menu}
            changeMenu={this.changeMenu}
          />
        </div>
      </>
    );
  }
}

export default SideNav;
