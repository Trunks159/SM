import React, {  useState } from "react";
import { Menu, MenuItem, Button } from "@material-ui/core";
import profileIcon from "../../assets/images/Profile Icon.svg";
import { Link, Redirect } from "react-router-dom";

const MyMenu = ({ username, handleCollapse, logoutUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [redirect, setRedirect] = useState(null);

  function handleClick(e) {
    setAnchorEl(e.target);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleLogout() {
    handleCollapse();
    logoutUser();
    setRedirect(<Redirect to={"/login"} />);
  }
  const isOpen = Boolean(anchorEl);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {redirect}
      <Button
        id="basic-button"
        aria-controls={isOpen ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        onClick={handleClick}
        style={{
          textTransform: "none",
          padding: 0,
          margin: 0,
          minWidth: 0,
        }}
      >
        <img  alt = 'profile' src={profileIcon} />
      </Button>
      <p className="nav-link" style={{ margin: 8 }}>
        {username}
      </p>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link onClick={handleCollapse} to="/">
            <p>My Profile</p>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link onClick={handleCollapse} to="/">
            <p>My Availability</p>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button onClick={handleLogout}>
            <p>Logout</p>
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MyMenu;
