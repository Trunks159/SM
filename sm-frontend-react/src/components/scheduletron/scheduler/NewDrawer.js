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
      <>
        <button
          style={{
            border: "none",
            background: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 100,
            height: 100,
            position: "fixed",
            bottom: 20,
            right: 20,
          }}
          onClick={this.toggleDrawer}
        >
          {" "}
          <>
            <img
              style={{
                position: "absolute",
                opacity: this.state.isOpen ? 1 : 0,
                transitionDuration: ".3s",
              }}
              src={closeActionsIcon}
            />
            <img
              style={{
                position: "absolute",
                opacity: this.state.isOpen ? 0 : 1,
                transitionDuration: ".3s",
              }}
              src={actionsIcon}
            />
          </>
        </button>
        <Collapse
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
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
      </>
    );
  }
}

export default NewDrawer;
