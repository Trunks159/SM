import React from "react";
import { Link } from "react-router-dom";
import UsersDrawer from "./UsersDrawer";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles({
  button: {
    textTransform: "none",
    background: "#FF4BDB",
  },
  nav: {
    backgroundColor: "#c63aab",
    height: "50px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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

  const isAuthenticated = (user) => {
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
        <Button className="nav-link logout" onClick={logoutUser}>
          Logout
        </Button>
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

  return (
    <AppBar position="static" className={classes.nav}>
      <Toolbar>
        <UsersDrawer
          users={users}
          postReq={postReq}
          current_user={current_user}
          notifyUser={notifyUser}
        />
        <Link className="nav-logo" to="/">
          <img
            src="http://localhost:5000/static/images/logo.png"
            alt="Scheduletron"
          />
        </Link>
        {current_user.is_authenticated
          ? isAuthenticated(current_user)
          : notAuthenticated()}
      </Toolbar>
      {/*
      <Users users={users} />*/}
    </AppBar>
  );
};

export default NavBar;
