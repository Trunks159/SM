import React, { Component } from "react";
import { Menu, MenuItem, Button } from "@material-ui/core";
import profileIcon from "../../assets/images/Profile Icon.svg";
import { Link, Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core";

const styles = () => ({
  label: {
    flexDirection: "column",
  },
  root: {
    fontSize: 11,
    color: "white",
    textTransform: "none",
  },
});

class MyMenu extends Component {
  state = {
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
    this.props.handleCollapse();
    this.props.handleLogout();
    this.setState({ redirect: true });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { username, classes, handleCollapse } = this.props;
    return (
      <div>
        {this.state.redirect && <Redirect to={"/login"} />}
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={this.handleClick}
          style={{
            textTransform: "none",
            padding: 0,
            margin: 0,
            minWidth: 1,
          }}
        >
          <img src={profileIcon} />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={this.handleClose}>
            <Link onClick={handleCollapse} to="/">
              <p>Profile</p>
            </Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link onClick={handleCollapse} to="/">
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

export default withStyles(styles)(MyMenu);
