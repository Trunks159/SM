import React from "react";
import { Link } from "react-router-dom";
import Users from "./Users";
import UsersDrawer2 from "./UsersDrawer2";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles, withTheme } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    textTransform: "none",
    background: "#FF4BDB",
  },
});

const NavBar = ({
  users,
  current_user,
  getReq,
  postReq,
  Thumbnail,
  notifyUser,
}) => {
  const classes = useStyles();

  const logoutUser = () => {
    getReq("/logout");
    notifyUser({
      content: "You Have Been Logged Out",
      severity: "success",
      title: "Logged Out",
    });
  };

  const isAuthenticated = (user, Thumbnail) => {
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
      <UsersDrawer2
        users={users}
        postReq={postReq}
        current_user={current_user}
      />
      <Link className="nav-logo" to="/">
        <img
          src="http://localhost:5000/static/images/logo.png"
          alt="Scheduletron"
        />
      </Link>
      {current_user.is_authenticated
        ? isAuthenticated(current_user, Thumbnail)
        : notAuthenticated()}
      {/*
      <Users users={users} />*/}
    </nav>
  );
};

export default NavBar;
