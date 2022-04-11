import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../assets/images/ScheduleTron Icon.svg";
import teamIcon from "../../assets/images/Team Icon.svg";
import scheduleIcon from "../../assets/images/Schedule Icon.svg";
import { Paper } from "@material-ui/core";
import MyMenu from "./MyMenu";

const useStyles = makeStyles({
  nav: {
    width: "100%",
    maxHeight: 67,
    display: "flex",
    alignItems: "center",
    borderRadius : '0',
  },
  logo: {
    width: 48,
    height: 48,
    marginLeft: 42,
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
    fontWeight :'500',
  },
});

const NavBar = ({ currentUser }) => {
  const classes = useStyles();
  console.log("Current: ", currentUser);

  return (
    <Paper elevation = {3} className={classes.nav}>
      <Link to = '/' className={classes.logo}>
        <img src={logo} />
      </Link>

      {currentUser.isAuthenticated ? (
        <div className={classes.links}>
          <Link className={classes.link} to="/scheduletron">
            <img src={scheduleIcon} />
            <p>Schedule</p>
          </Link>
          <Link className={classes.link} to="/">
            <img src={teamIcon} />
            <p>Team</p>
          </Link>
          <MyMenu username = {currentUser.username}/>
        </div>
      ) : (
        <div className={classes.links}>
          <Link className={classes.link} to="/login">
            Login
          </Link>
          <Link className={classes.link} to="/register">
            Register
          </Link>
        </div>
      )}
    </Paper>
  );
};

export default NavBar;
