import React from "react";
import { Link, NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import homeIcon from "../../assets/images/Home Icon Grey.svg";
import logo from "../../assets/images/ScheduleTron Icon.svg";
import teamIcon from "../../assets/images/Team Icon.svg";
import scheduleIcon from "../../assets/images/Schedule Icon Grey.svg";
import { Paper } from "@material-ui/core";
import MyMenu from "./MyMenu";

const useStyles = makeStyles({
  nav: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    borderRadius: "0",
    height: 65,
    borderBottom: "1px solid #ECECEC",
    borderTop: "1px solid #ECECEC",
    justifyContent: "center",
    "@media (max-width: 600px)": {
      position: "fixed",
      bottom: 0,
    },
  },
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

const CustomLink = ({ to, src, children, className }) => (
  <Link className={className} to={to}>
    <img alt={"/"} src={src} />
    <p style={{ display: "hidden" }}>{children}</p>
  </Link>
);

const NavBar = ({ currentUser }) => {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.nav}>
      <Link to="/" className={classes.link}>
        <img className={classes.logo} alt={""} src={logo} />
        <img className={classes.home} alt={""} src={homeIcon} />
      </Link>

      {currentUser.isAuthenticated ? (
        <>
          <CustomLink
            to={"/scheduletron"}
            className={classes.customLink}
            src={scheduleIcon}
          >
            Schedule
          </CustomLink>
          <CustomLink
            to={"/team"}
            className={classes.customLink}
            src={teamIcon}
          >
            Team
          </CustomLink>

          <MyMenu username={currentUser.username} />
        </>
      ) : (
        <>
          <Link className={classes.link} to="/login">
            Login
          </Link>
          <Link className={classes.link} to="/register">
            Register
          </Link>
        </>
      )}
    </Paper>
  );
};

export default NavBar;
