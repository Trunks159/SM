import React from "react";
import { NavLink, Link } from "react-router-dom";
import UsersDrawer from "./UsersDrawer";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Divider } from "@material-ui/core";
import UserMenu from "./UserMenu";
import IconLink from "./IconLink";
import { ReactComponent as ScheduleTronIcon } from "../../assets/images/ScheduleTron Icon.svg";
import { ReactComponent as WeekViewIcon } from "../../assets/images/Week View Icon.svg";
import { ReactComponent as ShiftViewIcon } from "../../assets/images/Shift View Icon.svg";
import { ReactComponent as ShiftStatsIcon } from "../../assets/images/Shift Stats Icon.svg";
import notificationsIcon from "../../assets/images/Notifications Icon.svg";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import expandIcon from "../../assets/images/Expand Icon.svg";

const useStyles = makeStyles({
  nav: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    minWidth: 100,
    gap: "10px",
    margin: 15,
    marginLeft: 5,
  },
  mainLogo: {
    marginRight: 10,
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
    marginBottom: "10px",
  },
  navLinkActive: {
    color: "#328F83",
  },
  divider: {
    width: "80%",
    background: "#C4C3C3",
    marginTop: 10,
    marginBottom: 10,
  },
});

const NavBar = ({
  users,
  currentUser,
  getReq,
  postReq,
  notifyUser,
  colorPalette,
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
      <Link className={classes.mainLogo} to="/">
        <ScheduleTronIcon />
      </Link>

      {currentUser.isAuthenticated ? (
        <>
          <UserMenu username={currentUser.username} logoutUser={logoutUser} />
          <Button>
            <img src={notificationsIcon} />
          </Button>
        </>
      ) : (
        <React.Fragment>
          <NavLink
            className={classes.navLink}
            activeClassName={classes.navLinkActive}
            to="/login"
          >
            Login
          </NavLink>
          <NavLink
            className={classes.navLink}
            activeClassName={classes.navLinkActive}
            to="/register"
          >
            Register
          </NavLink>
        </React.Fragment>
      )}
      <UsersDrawer
        colorPalette={colorPalette}
        users={users}
        postReq={postReq}
        currentUser={currentUser}
        notifyUser={notifyUser}
      />

      <Divider className={classes.divider} />

      <IconLink img={<WeekViewIcon />} label="Week Schedule" />
      <Accordion
        disableGutters
        sx={{ width: 75, margin: 0, borderRadius: "7px", border : '1px solid #D2DDDA',
          overflowY : 'auto' }}
        elevation = {0}
      >
        <AccordionSummary
          expandIcon={
            <img style={{ marginLeft: 5, marginRight: 0 }} src={expandIcon} />
          }
        >
          <Button
            style={{
              background: colorPalette.primary,
              color: "white",
              width: 42,
              height: 42,
              minWidth: 42,
              marginLeft: 12,
            }}
          >
            <p style={{ margin: 0 }}>9/13</p>
          </Button>
        </AccordionSummary>
        <AccordionDetails
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          {["9/14", "9/15", "9/16", "9/17", "9/18", "9/19", "9/17", "9/18", "9/19"].map((d) => (
            <Button
              style={{
                background: "#D2DDDA",
                color: "white",
                width: 42,
                height: 42,
                minWidth: 42,
              }}
              key={d}
            >
              {d}
            </Button>
          ))}
        </AccordionDetails>
      </Accordion>
    </nav>
  );
};

export default NavBar;
