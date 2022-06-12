import React, { Component } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Zoom from "@mui/material/Zoom";
import actionsIcon from "../../../assets/images/Actions Icon.svg";

class NewDrawer extends Component {
  state = {
    isOpen: false,
  };

  toggleDrawer = (e, open) => {
    console.log("What up: ", e);
    this.setState({ isOpen: open });
  };

  render() {
    return (
      <div>
        <Zoom
          in={!this.state.isOpen}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            transitionDuration: ".5s",
          }}
        >
          <Button
            startIcon={<img src={actionsIcon} />}
            onClick={(e) => this.toggleDrawer(e, true)}
          />
        </Zoom>

        <Drawer
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
        </Drawer>
      </div>
    );
  }
}

export default NewDrawer;
