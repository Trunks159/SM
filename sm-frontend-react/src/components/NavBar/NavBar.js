import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import homeIcon from "../../assets/images/Home Icon Grey.svg";
import logo from "../../assets/images/ScheduleTron Icon.svg";
import teamIcon from "../../assets/images/Team Icon.svg";
import scheduleIcon from "../../assets/images/Schedule Icon.svg";
import profileIcon from "../../assets/images/Profile Icon.svg";
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

  render() {
    const { currentUser, handleLogout } = this.props;
    const style = {
      transition: "transform .1s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "10px 0px",
      border: "none",
      background: "none",
    };
    return (
      <>
        <div
          style={{ width: 63, height: '100vh', background : 'red' }}
        ></div>
        <nav
          style={{
            background: this.state.isOpen ? "#65747D" : "#DFE2E4",
            height: this.state.isOpen ? "100vh" : "min-content",
            position: "fixed",
          }}
        >
          <button
            style={
              this.state.isOpen
                ? { ...style, transform: "rotate(90deg)" }
                : style
            }
            onClick={() => this.setState({ isOpen: !this.state.isOpen })}
          >
            <img src={logo} />
          </button>

          <Collapse in={this.state.isOpen}>
            <div
            className="nav-links"
            >
              <NavLink className = 'nav-link' to="/scheduletron">
                <img src={scheduleIcon} />
              </NavLink>
              <NavLink className = 'nav-link' to="/">
                <img src={teamIcon} />
              </NavLink>
              <NavLink
              className = 'nav-link'
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textDecoration: "none",
                  fontSize: 11,
                  color: "white",
                }}
                to="/"
              >
                <img src={profileIcon} />
                Trunks159
              </NavLink>
            </div>
          </Collapse>
        </nav>
      </>

      /*
    <>
      <nav className="placeholder-nav"></nav>
      <nav className="nav-bar">
        <NavLink to="/" className={classes.link}>
          <img className={classes.logo} alt={""} src={logo} />
          <img className={classes.home} alt={""} src={homeIcon} />
        </NavLink>

        {currentUser.isAuthenticated ? (
          <>
            <NavLink className={classes.customLink} to={"/scheduletron"}>
              <img alt={"/"} src={scheduleIcon} />
              <p style={{ display: "hidden" }}>Schedule</p>
            </NavLink>

            <NavLink className={classes.customLink} to={"/team"}>
              <img alt={"/"} src={teamIcon} />
              <p style={{ display: "hidden" }}>Team</p>
            </NavLink>

            <MyMenu
              id={currentUser.id}
              username={currentUser.username}
              handleLogout={handleLogout}
            />
          </>
        ) : (
          <>
            <NavLink className={classes.link} to="/login">
              Login
            </NavLink>
            <NavLink className={classes.link} to="/register">
              Register
            </NavLink>
          </>
        )}
      </nav>
    </>
  */
    );
  }
}

export default NavBar;
