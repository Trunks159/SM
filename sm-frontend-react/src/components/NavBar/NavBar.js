import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/ScheduleTron Icon.svg";
import logoActive from "../../assets/images/ScheduleTron Icon Active.svg";
import teamIcon from "../../assets/images/Team Icon.svg";
import scheduleIcon from "../../assets/images/Schedule Icon.svg";
import homeIcon from "../../assets/images/Home Icon.svg";
import MyMenu from "./MyMenu";
import "./navbar.css";
import { Divider, Collapse } from "@material-ui/core";

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
          background: isOpen ? "#004F78" : "rgba(123, 136, 144, .4)",
          height: isOpen ? "100vh" : 70,
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
            {currentUser.isAuthenticated ? (
              <MyMenu
                username={currentUser.username}
                id={currentUser.id}
                handleLogout={handleLogout}
                handleCollapse={this.handleCollapse}
              />
            ) : (
              <>
                <NavLink
                  style={{
                    fontSize: 13,
                    fontWeight: "normal",
                    textDecoration: "none",
                    color: "white",
                    margin: "10px 0px",
                  }}
                  to={"/login"}
                >
                  Sign In
                </NavLink>

                <NavLink
                  style={{
                    fontSize: 13,
                    fontWeight: "normal",
                    textDecoration: "none",
                    color: "white",
                    margin: "20px 10px",
                  }}
                  to={"/register"}
                >
                  Register
                </NavLink>
              </>
            )}

            <Divider
              style={{
                margin: "10px 0px",
                background: "white",
                width: "90%",
                opacity: 0.3,
              }}
            />
            <NavLink onClick={this.handleCollapse} className="nav-link" to="/">
              <img style={{ margin: 5 }} src={homeIcon} />
              Home
            </NavLink>
            <NavLink
              onClick={this.handleCollapse}
              className="nav-link"
              to="/scheduletron"
            >
              <img style={{ margin: 5 }} src={scheduleIcon} />
              Schedules
            </NavLink>
            <NavLink onClick={this.handleCollapse} className="nav-link" to="/">
              <img src={teamIcon} />
              Team
            </NavLink>
          </div>
        </Collapse>
      </nav>
    );
  }
}

export default NavBar;
