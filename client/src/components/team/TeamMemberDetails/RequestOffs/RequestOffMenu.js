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
} from "@mui/material";
import searchIcon from "./assets/Search Icon.svg";
import editIcon from "./assets/Edit Icon.svg";
import saveIcon from "./assets/Save Icon.svg";
import addIcon from "./assets/Add Icon.svg";
import menuIcon from "./assets/Menu Icon.svg";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { useLocation, Link } from "react-router-dom";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    background: "#2A2A2A",
    color: "white",
    width: "150px",
  },
}));

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
      <Box>
        <StyledDrawer
          anchor="right"
          open={open}
          onClose={() => setOpen(false)}
          variant={isMobile ? "temporary" : "permanent"}
        >
          <List>
            <ListItem>
              <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
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
                  component={to ? Link : Button}
                  sx={{ minWidth: 0 }}
                  to={to}
                  onClick={() => setOpen(false)}
                >
                  <ListItemIcon sx={{ width: 40, minWidth: 0 }}>
                    <img src={icon} />
                  </ListItemIcon>
                  <ListItemText>{label}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </StyledDrawer>
      </Box>
    </>
  );
}

export default RequestOffMenu;
