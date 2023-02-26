import React, { Component } from "react";
import MenuContent from "./MenuContent";

class SearchContent extends Component {
  state = {};
  render() {
    const { menu, value } = this.props;
    return (
      <MenuContent menu={menu} value={value}>
        Anim adipisicing qui enim proident velit occaecat dolore. Adipisicing
        ullamco ipsum duis est exercitation nisi. Magna ad dolore esse labore
        incididunt veniam eu pariatur mollit officia sit. Lorem aliquip ipsum
        commodo quis aliqua enim proident ut ea occaecat.
      </MenuContent>
    );
  }
}

export default SearchContent;
