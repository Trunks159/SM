import React from "react";
import { Link, NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import homeIcon from "../../assets/images/Home Icon Grey.svg";
import logo from "../../assets/images/ScheduleTron Icon.svg";
import teamIcon from "../../assets/images/Team Icon.svg";
import scheduleIcon from "../../assets/images/Schedule Icon Grey.svg";
import MyMenu from "./MyMenu";
import "./navbar.css";
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

const NavBar = ({ currentUser, handleLogout }) => {
  const classes = useStyles();

  return (
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
  );
};

export default NavBar;
