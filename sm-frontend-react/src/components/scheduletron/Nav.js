import { Button } from "@material-ui/core";
import React from "react";
import homeIcon from "../../assets/images/Home Icon.svg";
import scheduleIcon from "../../assets/images/Schedule Icon White.svg";
import settingsIcon from "../../assets/images/Settings Icon Not Active.svg";
import {NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  label: {
    flexDirection: "column",
  },
  settings: {
    textTransform: "none",
    marginTop: "auto",
    color: "white",
    fontWeight: "normal",
    fontSize: 9,
  },
});

const IconLink = ({ img, label, to }) => (
  <NavLink
    activeStyle={{
      color: "white",
    }}
    style={{
      color: "#9DB5C2",
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      margin: 10,
    }}
    exact
    to={to}
  >
    <img alt = '' src={img} />
    {label ? <p style={{ margin: 0, fontSize: 9 }}>{label}</p> : null}
  </NavLink>
);

const Nav = ({ path, dayId }) => {
  const classes = useStyles();
  return (
    <div
      style={{
        background: "#51636D",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 70,
      }}
    >
      <IconLink
        img={homeIcon}
        label={path === "/scheduletron" ? "Home" : null}
        to={path}
      />
      <IconLink
        img={scheduleIcon}
        label={path !== "/scheduletron" ? "Schedule" : null}
        to={path + `/${dayId}`}
      />
      <Button
        classes={{ label: classes.label, root: classes.settings }}
        startIcon={
          <img alt = '' style={{ marginLeft: 10, marginBottom: 5 }} src={settingsIcon} />
        }
      ></Button>
    </div>
  );
};

export default Nav;
