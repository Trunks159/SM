import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../assets/images/ScheduleTron Icon.svg";
import logoActive from "../../assets/images/ScheduleTron Icon Active.svg";
import teamIcon from "../../assets/images/Team Icon.svg";
import scheduleIcon from "../../assets/images/Schedule Icon.svg";
import homeIcon from "../../assets/images/Home Icon.svg";
import MyMenu from "./MyMenu";
import "./navbar.css";
import { Collapse, Button } from "@mui/material";
const useStyles = makeStyles({
  logo: {
    "@media (max-width :600px)": { display: "none" },
  },
  home: {
    "@media (min-width :600px)": { display: "none" },
  },
  links: {
    marginLeft: "auto",
    marginRight: 40,
    display: "flex",
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: 14,
    margin: 20,
    display: "flex",
    "& img": {
      margin: 6,
    },
    fontWeight: "500",
  },
  customLink: {
    textDecoration: "none",
    color: "black",
    fontSize: 14,
    margin: 20,
    display: "flex",
    "& img": {
      margin: 6,
      width: 31,
    },
    "& p": {
      display: "none",
    },
    fontWeight: "500",
    "@media (min-width : 600px)": {
      "& p": {
        display: "block",
      },
      "& img": {
        width: "auto",
      },
    },
  },
});

class NavBar extends Component {
  state = {
    isOpen: false,
  };

  handleCollapse = () => this.setState({ isOpen: false });

  handleMouseEnter = () => this.setState({ isOpen: true });
  handleMouseLeave = () => this.setState({ isOpen: false });

  render() {
    const { currentUser, handleLogout } = this.props;
    const style = {
      transition: "transform .1s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      background: "none",
      height: 60,
    };
    const { isOpen } = this.state;

    return (
      <nav
        className="main-nav"
        style={{
          zIndex: isOpen ? 2 : 1,
          background: isOpen
            ? "rgba(123, 136, 144, 1)"
            : "rgba(123, 136, 144, .4)",
          height: isOpen ? "100vh" : 60,
        }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <button
          className="main-button"
          style={isOpen ? { ...style, transform: "rotate(90deg)" } : style}
          onClick={() => this.setState({ isOpen: !isOpen })}
        >
          <img
            style={{
              position: "absolute",
              opacity: isOpen ? 0 : 1,
              transition: "opacity .2s",
            }}
            src={logo}
          />
          <img
            style={{
              position: "absolute",
              opacity: isOpen ? 1 : 0,
              transition: "opacity .2s",
            }}
            src={logoActive}
          />
        </button>

        <Collapse in={isOpen}>
          <div className="nav-links">
            <NavLink onClick={this.handleCollapse} className="nav-link" to="/">
              <img src={homeIcon} />
            </NavLink>
            <NavLink
              onClick={this.handleCollapse}
              className="nav-link"
              to="/scheduletron"
            >
              <img src={scheduleIcon} />
            </NavLink>
            <NavLink onClick={this.handleCollapse} className="nav-link" to="/">
              <img src={teamIcon} />
            </NavLink>
            {currentUser.isAuthenticated && (
              <MyMenu
                username={currentUser.username}
                id={currentUser.id}
                handleLogout={handleLogout}
                handleCollapse={this.handleCollapse}
              />
            )}
          </div>
        </Collapse>
      </nav>
    );
  }
}

export default NavBar;
