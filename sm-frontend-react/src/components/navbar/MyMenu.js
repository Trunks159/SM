import React, { Component } from "react";
import { Menu, MenuItem, Button } from "@material-ui/core";
import profileIcon from "../../assets/images/Profile Icon.svg";
import { Link, Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core";

const styles = ()=>({
  label : {
    flexDirection : 'column'
  },
  root : {
    fontSize : 11,
    color : 'white',
    textTransform : 'none',

  }
}) ;

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
    const { username, classes } = this.props;
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
        classes = {{label : classes.label , root : classes.root}}
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


export default withStyles(styles)(MyMenu);
