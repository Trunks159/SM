import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Box, Drawer, Button, Divider } from "@mui/material";
import MyMenu from "./MyMenu";
import menuIcon from "./assets/Menu Icon.svg";
import smallLogo from "./assets/Small Logo.svg";
import logo from "./assets/Logo.svg";
import homeIcon from "./assets/Home Icon.svg";
import scheduleIcon from "./assets/Schedule Icon.svg";
import teamIcon from "./assets/Team Icon.svg";
import "./navbar.css";
import styled from "@emotion/styled";
import Notification from "../Notification";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: "max-content",
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    padding: "25px",
    boxSizing: "border-box",
    background: "#2E3A40",
    color: "white",
    position: "sticky",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      position: "sticky",
      height: "100vh",
    },
    fontFamily: "  Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    gap: "30px",
  },
}));

function TheActualDrawer({ isOpen, setIsOpen }) {
  const screenWidth = useSelector((state) => state.screenWidth);
  const isMobile = screenWidth < 600;
  const location = useLocation();
  const currentUser = useSelector((state) => state.currentUser);
  const DrawerLink = (props) => {
    const isActive = props.exact
      ? props.to.split("/").slice(-1)[0] ===
        location.pathname.split("/").slice(-1)[0]
      : location.pathname.includes(props.to);
    return (
      <Link
        {...props}
        onClick={() => setIsOpen(false)}
        className={`navlink ${isActive ? "navlink-active" : ""}`}
      >
        {props.children}
      </Link>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <StyledDrawer
        anchor="left"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        variant={isMobile ? "temporary" : "permanent"}
      >
        {currentUser.username ? (
          <>
            <MyMenu
              collapseDrawer={() => setIsOpen(false)}
              id={currentUser.id}
              username={currentUser.username}
            />
            <Divider />
            {[
              {
                label: "Home",
                icon: homeIcon,
                url: "/",
                exact: true,
              },
              {
                label: "Schedule",
                icon: scheduleIcon,
                url: "/scheduletron",
              },
              { label: "Team", icon: teamIcon, url: "/team" },
            ].map(({ label, icon, url, exact }) => {
              return (
                <DrawerLink to={url} exact={exact}>
                  <img src={icon} />
                  {label}
                </DrawerLink>
              );
            })}
          </>
        ) : (
          <>
            <DrawerLink to="/login">Sign In</DrawerLink>
            <DrawerLink to="/register">Register</DrawerLink>
          </>
        )}

        <Link to="/" className="logo">
          <img src={logo} />
        </Link>
      </StyledDrawer>
    </Box>
  );
}

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className={`appbar ${isOpen ? "appbar-open" : ""}`}>
        <Button onClick={() => setIsOpen(true)}>
          <img src={menuIcon} />
        </Button>
        <Link to="/">
          <img src={smallLogo} />
        </Link>
      </nav>

      <TheActualDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default NavBar;
