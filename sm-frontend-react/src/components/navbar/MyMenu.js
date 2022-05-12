import React, { Component } from "react";
import { Menu, MenuItem, Button } from "@material-ui/core";
import profileIcon from "../../assets/images/Profile Icon.svg";
import { Link, Redirect } from "react-router-dom";

class MyMenu extends Component {
  state = {
    open: false,
    anchorEl: null,
    redirect: false,
  };

  handleClick = (e) => {
    this.setState({ anchorEl: e.target, open: !this.state.open });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    fetch("/logout")
      .then((response) => response.json())
      .then(() => {
        this.setState({ redirect: true });
      });
  };

  render() {
    const { open, anchorEl } = this.state;
    const { username } = this.props;
    return (
      <div
        style={{
          border: "2px solid black",
          borderRadius: "7px",
          height: 38,
          marginTop: "auto",
          marginBottom: "auto",
          padding: 5,
        }}
      >
        {this.state.redirect && <Redirect to={"/login"} />}
        <Button
          id="demo-positioned-button"
          aria-controls="demo-positioned-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={this.handleClick}
          startIcon={<img alt={""} src={profileIcon} />}
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
            <Button onClick={this.handleLogout}>
              <p>Logout</p>
            </Button>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

class BasicMenu extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const open = Boolean(this.state.anchorEl);
    const { username, id, handleLogout } = this.props;
    return (
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={this.handleClick}
        >
          {username}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={this.state.anchorEl}
          open={open}
          onClose={this.handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={this.handleClose}>
            <Link className={"menu-link"}>My Profile</Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link className={"menu-link"}>My Availability</Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link onClick={handleLogout} className={"menu-link"}>
              Logout
            </Link>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default BasicMenu;
