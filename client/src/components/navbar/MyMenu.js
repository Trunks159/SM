import React, { useState } from "react";
import { Button, Divider, Menu, MenuItem } from "@mui/material";
import profileIcon from "./assets/Profile Icon.svg";
import { Link } from "react-router-dom";
import { grey } from "@mui/material/colors";

const MyMenu = ({ username, collapseDrawer, id }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [redirect, setRedirect] = useState(null);

  function handleClick(e) {
    setAnchorEl(e.target);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function closeEverything() {
    handleClose();
    collapseDrawer();
  }

  const MyMenuItem = (props) => (
    <MenuItem onClick={closeEverything} {...props}>
      {props.children}
    </MenuItem>
  );

  const isOpen = Boolean(anchorEl);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {redirect}
      <Button
        sx={{
          flexDirection: "column",
          alignItems: "center",
          color: "white",
          textTransform: "none",
          fontWeight: "normal",
          gap: "5px",
          fontSize: 16,
        }}
        onClick={handleClick}
      >
        <div
          style={{
            width: 95,
            height: 95,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#FFFFFF",
          }}
        >
          <img src={profileIcon} />
        </div>
        {username}
      </Button>
      <Divider sx={{ background: grey[50], width: "100%" }} />
      <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
        <MyMenuItem>
          <Link className="profile-menu-link" to={`/team/profile/${id}`}>
            My Profile
          </Link>
        </MyMenuItem>
        <MyMenuItem>
          <Link
            className="profile-menu-link"
            to={`/team/profile/${id}/requestoffs`}
          >
            My Request Offs
          </Link>
        </MyMenuItem>
        <MyMenuItem>
          <Link className="profile-menu-link" to="/logout">
            Logout
          </Link>
        </MyMenuItem>
      </Menu>
    </div>
  );
};

export default MyMenu;
