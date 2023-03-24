import React, { useState } from "react";
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  InputBase,
  Box,
  Collapse,
} from "@mui/material";
import searchIcon from "./assets/Search Icon.svg";
import editIcon from "./assets/Edit Icon.svg";
import saveIcon from "./assets/Save Icon.svg";
import addIcon from "./assets/Add Icon.svg";
import menuIcon from "./assets/Menu Icon.svg";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { useLocation, Link } from "react-router-dom";

function RequestOffMenu() {
  const screenWidth = useSelector((state) => state.screenWidth);
  const isMobile = screenWidth < 530;
  const [open, setOpen] = useState(false);
  const location = useLocation();
  function handleCollapse() {
    setOpen(!open);
  }
  return (
    <>
      <Button
        sx={{ marginLeft: "auto", position: "absolute", right: 0, top: 0 }}
        onClick={handleCollapse}
      >
        <img alt="menu-icon" src={menuIcon} />
      </Button>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          zIndex: 1,
          background: "#2A2A2A",
          borderRadius: "7px 0px 0px 7px",
        }}
      >
        <Collapse in={open} orientation={"horizontal"}>
          <Box sx={{ width: "135px", zIndex: 2 }}>
            <List>
              <ListItem>
                <InputBase
                  sx={{ ml: 1, flex: 1, color: "white" }}
                  placeholder="Search"
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <img src={searchIcon} />
                </IconButton>
              </ListItem>
              {[
                { icon: editIcon, label: "Edit" },
                {
                  icon: addIcon,
                  label: "Add",
                  to: `${location.pathname}${
                    [...location.pathname.split("/")].pop().includes("add")
                      ? ""
                      : "/add"
                  }`,
                },
                { icon: saveIcon, label: "Save" },
              ].map(({ icon, label, to }) => (
                <ListItem>
                  <ListItemButton
                    key={label}
                    component={to ? Link : Button}
                    sx={{
                      minWidth: 0,
                      color: "white",
                      textTransform: "none",
                      "&:hover": {
                        background: "black",
                      },
                    }}
                    to={to}
                    onClick={() => setOpen(false)}
                  >
                    <ListItemIcon sx={{ width: 30, minWidth: 0 }}>
                      <img src={icon} />
                    </ListItemIcon>
                    <ListItemText>{label}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Collapse>
      </div>
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: "none",
          display: open ? "block" : "none",
        }}
        onClick={handleCollapse}
      ></div>
    </>
  );
}

export default RequestOffMenu;
