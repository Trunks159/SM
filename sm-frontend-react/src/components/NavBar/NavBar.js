import React from "react";
import { Link } from "react-router-dom";
import Users from "./Users";
import UsersDrawer from "./UsersDrawer";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles, withTheme } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    textTransform: "none",
    background: "#FF4BDB",
  },
});

const NavBar = ({ users, current_user, logoutUser, Thumbnail }) => {
  const classes = useStyles();
  const isAuthenticated = (user, logoutUser, Thumbnail) => {
    return (
      <React.Fragment>
        <Link className="nav-link username" to={`/user/${user.username}`}>
          <Button
            variant="contained"
            startIcon={<AccountCircleIcon style={{ fill: "white" }} />}
            className={classes.button}
          >
            {user.username}
          </Button>
        </Link>
        <Link className="nav-link logout" onClick={logoutUser}>
          Logout
        </Link>
      </React.Fragment>
    );
  };

  const notAuthenticated = () => {
    return (
      <React.Fragment>
        <Link className="nav-link login" to="/login">
          Login
        </Link>
        <Link className="nav-link register" to="/register">
          Register
        </Link>
      </React.Fragment>
    );
  };

  const isManager = (user) => {
    if (user.position) {
      return (
        <li className="nav-link">
          <Link to="/">Add User</Link>
        </li>
      );
    }
  };
  return (
    <nav className="nav-bar">
      <UsersDrawer users={users} />
      <Link className="nav-logo" to="/">
        <img
          src="http://localhost:5000/static/images/logo.png"
          alt="Scheduletron"
        />
      </Link>
      {current_user.is_authenticated
        ? isAuthenticated(current_user, logoutUser, Thumbnail)
        : notAuthenticated()}
      {/*
      <Users users={users} />*/}
    </nav>
  );
};

export default NavBar;
