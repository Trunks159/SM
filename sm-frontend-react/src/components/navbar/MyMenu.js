import React, { Component } from "react";
import { Menu, MenuItem, Button } from "@material-ui/core";
import profileIcon from "../../assets/images/Profile Icon.svg";
import { Link } from "react-router-dom";

class MyMenu extends Component {
  state = {
    open: false,
    anchorEl: null,
  };

  handleClick = (e) => {
    console.log("Stff: ", e.target);
    this.setState({ anchorEl: e.target, open: !this.state.open });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { open, anchorEl } = this.state;
    const { classes, username } = this.props;
    return (
      <div
        style={{ border: "2px solid black", borderRadius: "7px", height: 38, marginTop : 'auto', marginBottom : 'auto' , padding : 5}}
      >
        <Button
          id="demo-positioned-button"
          aria-controls="demo-positioned-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={this.handleClick}
          startIcon={<img src={profileIcon} />}
          style={{ textTransform: "none" }}
        >
          {username}
        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={this.handleClose}>
            <Link to="/">
              <p>Profile</p>
            </Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link to="/">
              <p>My Availability</p>
            </Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link to="/">
              <p>Logout</p>
            </Link>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default MyMenu;
