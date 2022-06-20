import React, { Component } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Zoom from "@mui/material/Zoom";
import actionsIcon from "../../../assets/images/Actions Icon.svg";
import closeActionsIcon from "../../../assets/images/Close Actions Icon.svg";
import { Collapse } from "@material-ui/core";

class NewDrawer extends Component {
  state = {
    isOpen: false,
  };

  toggleDrawer = (e, open = false) =>
    this.setState({ isOpen: open || !this.state.isOpen });

  render() {
    return (
      <div className="actions-drawer">
        <button
          className="actions-drawer-mainButton"
          onClick={this.toggleDrawer}
        >
          <img
            style={{
              position: "absolute",
              transitionDuration: ".3s",
              transform: this.state.isOpen && "rotate(180deg)",
            }}
            src={actionsIcon}
          />
        </button>
        <Collapse
          style={{
            background: "white",
          }}
          in={this.state.isOpen}
        >
          {this.props.children}
        </Collapse>
        {/* <Drawer
          anchor={"bottom"}
          open={this.state.isOpen}
          hideBackdrop
          transitionDelay={"1s"}
        >
          <Box
            sx={{ width: "auto" }}
            role="presentation"
            onClick={(e) => this.toggleDrawer(e, false)}
            onKeyDown={(e) => this.toggleDrawer(e, false)}
          >
            {this.props.children}
          </Box>
        </Drawer> */}
      </div>
    );
  }
}

export default NewDrawer;
