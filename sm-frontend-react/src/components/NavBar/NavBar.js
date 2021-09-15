import React from "react";
import { Link } from "react-router-dom";
import UsersDrawer from "./UsersDrawer";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";

const useStyles = makeStyles({
  button: {
    textTransform: "none",
    background: "#FF4BDB",
  },
  nav: {
    backgroundColor: "#328f83",
    height: "50px",
    alignItems: "center",
    display:'flex',
  },
  logo: {
    backgroundColor: "white",
    height: "100%",
    paddingLeft: "5px",
    paddingRight: "5px",
  },
  btn_logout: {
    textTransform: "none",
    color: "white",
    marginLeft: "10px",
    height: "60%",
    marginRight:'10px',
    fontSize : 16,
  },
  username: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    textDecoration: "none",
    color: "#328f83",
    backgroundColor: 'white',
    height: "60%",
    borderRadius: "5px",
  },
  circleIcon: {
    marginRight: "6px",
    marginLeft: "6px",
  },
  usernameText: {
    marginRight: "10px",
  },
});

const NavBar = ({ users, current_user, getReq, postReq, notifyUser }) => {
  const classes = useStyles();

  const logoutUser = () => {
    getReq("/logout");
    notifyUser({
      content: "You Have Been Logged Out",
      severity: "success",
      title: "Logged Out",
    });
  };

  return (
    <nav className={classes.nav}>
        <UsersDrawer
          users={users}
          postReq={postReq}
          current_user={current_user}
          notifyUser={notifyUser}
        />
        <Link className={classes.logo} to="/">
          <img
            className={classes.logo}
            src="http://localhost:5000/static/images/logo.svg"
            alt="Scheduletron"
          />
        </Link>
        {current_user.is_authenticated ? (
          <React.Fragment>
            <Link
              className={classes.username}
              to={`/user/${current_user.username}`}
            >
              <AccountCircleIcon
                style={{ fill: "#328f83" }}
                className={classes.circleIcon}
              />
              <Typography variant="body" className={classes.usernameText}>
                {current_user.username}
              </Typography>
            </Link>
            <Button className={classes.btn_logout} onClick={logoutUser}>
              Logout
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link className="nav-link login" to="/login">
              Login
            </Link>
            <Link className="nav-link register" to="/register">
              Register
            </Link>
          </React.Fragment>
        )}
      </nav>
  );
};

export default NavBar;
