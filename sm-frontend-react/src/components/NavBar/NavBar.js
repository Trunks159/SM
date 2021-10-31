import React from "react";
import { Link } from "react-router-dom";
import UsersDrawer from "./UsersDrawer";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Divider } from "@material-ui/core";
import UserMenu from "./UserMenu";

const useStyles = makeStyles({
  button: {
    textTransform: "none",
    background: "#FF4BDB",
  },
  nav: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    maxWidth: "200px",
    minWidth: "150px",
  },
  mainLogo: {
    margin: 10,
  },
  btn_logout: {
    textTransform: "none",
    marginLeft: "10px",
    height: "60%",
    marginRight: "10px",
    fontSize: 16,
  },
  username: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    textDecoration: "none",
    color: "white",
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
  navLink: {
    textDecoration: "none",
    fontSize: 18,
    color: "black",
    padding: 10,
  },
  divider: {
    width: "80%",
    background: "#F0F0F0",
    margin: 15,
  },
  iconBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: 10,
    "& p": {
      margin: 5,
    },
  },
});

const NavBar = ({
  users,
  current_user,
  getReq,
  postReq,
  notifyUser,
  imgSrc,
  colorPalette,
  currentUrl,
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

  return (
    <nav className={classes.nav}>
      <Link className={classes.mainLogo}>
        <img src={imgSrc + "/ScheduleTron Icon.svg"} alt="ScheduleTron" />
      </Link>
      {current_user.is_authenticated ? (
        <UserMenu username={current_user.username} logoutUser={logoutUser} />
      ) : (
        <React.Fragment>
          <Link className={classes.navLink} to="/login">
            Login
          </Link>
          <Link className={classes.navLink} to="/register">
            Register
          </Link>
          <Divider className={classes.divider} />
        </React.Fragment>
      )}
      <UsersDrawer
        colorPalette={colorPalette}
        imgSrc={imgSrc}
        users={users}
        postReq={postReq}
        current_user={current_user}
        notifyUser={notifyUser}
      />
      <Divider className={classes.divider} />
      <div className={classes.iconBtn}>
        <p>Week View</p>
        <Link to="/">
          <img src={imgSrc + "/Week View Icon.svg"} />
        </Link>
      </div>
      <div className={classes.iconBtn}>
        <p>Shift View</p>
        <Link to="/">
          <img src={imgSrc + "/Shift View Icon.svg"} />
        </Link>
      </div>
      <div className={classes.iconBtn}>
        <p>Shift Stats</p>
        <Link to="/">
          <img src={imgSrc + "/Shift Stats Icon.svg"} />
        </Link>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.iconBtn}>
        <p className={classes.p} style={{ color: colorPalette.orange }}>
          Submit
        </p>
        <Button>
          <img src={imgSrc + "/SCTR Submit Icon.svg"} />
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
