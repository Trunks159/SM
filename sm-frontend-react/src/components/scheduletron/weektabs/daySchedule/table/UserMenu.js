import React, { useState } from "react";
import { Menu, MenuItem, Button } from "@material-ui/core";
import detailsIcon from "";
import removeIcon from "";

const MyMenu = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(e) {
    setAnchorEl(e.target);
  }

  function handleClose() {
    setAnchorEl(null);
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
        <img alt="profile" src={detailsIcon} />
      </Button>
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
          <Button to="/" startIcon={removeIcon}>
            Remove Team Member
          </Button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button to="/">View Team Member Details</Button>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MyMenu;
