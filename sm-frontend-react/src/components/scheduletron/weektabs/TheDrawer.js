import { Collapse, Button } from "@material-ui/core";
import React, { Component } from "react";

class TheDrawer extends Component {
  state = {
    open : true,
  };
  render() {
    return (
      <Collapse in={this.state.open}>
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            right: 0,
            left: 70,
            background: "rgba(0,0,0,.66)",
          }}
        ><Button onClick = {()=>this.setState({open : false})}>Off</Button></div>
      </Collapse>
    );
  }
}

export default TheDrawer;
