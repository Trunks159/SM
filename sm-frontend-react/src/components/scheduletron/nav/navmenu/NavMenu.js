import React, { Component } from "react";
import { Collapse, Paper, Button } from "@mui/material";
import DaysContent from "./DaysContent";
import SearchContent from "./SearchContent";
import SettingsContent from "./SetttingsContent";
import searchIcon from "./assets/Search Icon Blue.svg";
import settingsIcon from "./assets/Settings Icon Blue.svg";
import daysIcon from "./assets/Days Icon Blue.svg";
import closeIcon from "./assets/Close Icon.svg";
import "./navmenu.css";

class NavMenu extends Component {
  state = {};

  getIcon = (menu) => {
    if (menu === "days") {
      return daysIcon;
    } else if (menu === "search") {
      return searchIcon;
    }
    return settingsIcon;
  };

  render() {
    const { menu, selectedWeek, changeMenu } = this.props;
    const icon = this.getIcon(menu);
    return (
      <Collapse in={Boolean(menu)} orientation={"horizontal"} timeout={70}>
        <Paper
          className="nav-menu"
          style={{ borderRadius: "0px 4px 4px 0px", background: "#EFF1F2" }}
        >
          <div className="nav-menu-header">
            <img src={icon} />
            <h1>{menu}</h1>
          </div>
          <Button
            style={{ position: "absolute", top: 0, right: 0 }}
            onClick={() => changeMenu(null)}
          >
            <img src={closeIcon} />
          </Button>
          {selectedWeek && (
            <DaysContent menu={menu} week={selectedWeek.week} value="days" />
          )}
          <SearchContent menu={menu} value="search" />
          <SettingsContent menu={menu} value="settings" />
        </Paper>
      </Collapse>
    );
  }
}

export default NavMenu;
