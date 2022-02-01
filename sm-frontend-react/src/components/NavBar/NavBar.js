import React from "react";
import { NavLink , Link} from "react-router-dom";
import UsersDrawer from "./UsersDrawer";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Divider } from "@material-ui/core";
import UserMenu from "./UserMenu";
import IconLink from "./IconLink";
import { ReactComponent as ScheduleTronIcon } from "../../assets/images/ScheduleTron Icon.svg";
import { ReactComponent as WeekViewIcon } from "../../assets/images/Week View Icon.svg";
import { ReactComponent as ShiftViewIcon } from "../../assets/images/Shift View Icon.svg";
import { ReactComponent as ShiftStatsIcon } from "../../assets/images/Shift Stats Icon.svg";
import { mergeClasses } from "@material-ui/styles";


const useStyles = makeStyles({
  nav: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    minWidth : 100,
    gap :'10px',
  },
  mainLogo: {
    marginTop : 10,
  },
  username: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    textDecoration: "none",
    color: "white",
    borderRadius: "5px",
  },
  navLink: {
    textDecoration: "none",
    fontSize: 14,
    color: "black",
    marginBottom : '10px',
  },
  navLinkActive: {
    color: "#328F83",
  },
  divider: {
    width: "80%",
    background: "#F0F0F0",
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
  navbarActions
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
      <Link className={classes.mainLogo} to = '/'>
        <ScheduleTronIcon/>
      </Link>
      {current_user.is_authenticated ? (
        <UserMenu username={current_user.username} logoutUser={logoutUser} />
      ) : (
        <React.Fragment>
          <NavLink className={classes.navLink} activeClassName = {classes.navLinkActive}  to="/login">
            Login
          </NavLink>
          <NavLink className={classes.navLink} activeClassName = {classes.navLinkActive} to="/register">
            Register
          </NavLink>
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
        {navbarActions ? (
          <>
            {navbarActions.map((action)=>(
              action
            ))}
            <Divider className = {classes.divider}/>
          </>
        ) : null}
      <IconLink img = {<WeekViewIcon/>} label  = 'Week View'/>
      <IconLink img = {<ShiftViewIcon/>} label  = 'Shift View'/>
      <IconLink img = {<ShiftStatsIcon/>} label  = 'Shift Stats'/>
    </nav>
  );
};

export default NavBar;
