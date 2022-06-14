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
      <div style={{position : 'fixed', display : 'flex', flexDirection : 'column', right : 10, bottom : 0}}>
        <button
          style={{
            border: "none",
            borderRadius : '7px 7px 0px 0px',
            background: "#FF4B4B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            height: 40,
          }}
          onClick={this.toggleDrawer}
        >
          {" "}
          
 
            
            <img
              style={{
                position: "absolute",
                opacity: this.state.isOpen ? 0 : 1,
                transitionDuration: ".3s",
                transform : this.state.isOpen && 'rotate(180deg)'
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
