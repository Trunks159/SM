import React, { Component } from "react";
import MenuContent from "./MenuContent";

class SettingsContent extends Component {
  state = {};
  render() {
    const { menu, value } = this.props;
    return (
      <MenuContent menu={menu} value={value}>
        Settings
      </MenuContent>
    );
  }
}

export default SettingsContent;
