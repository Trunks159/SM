import React, { useState } from "react";
import { Menu, MenuItem, Button } from "@material-ui/core";
import detailsIcon from "./assets/Details Icon.svg";

import styled from "@emotion/styled";
import { useDispatch } from "react-redux";

const StyledDetailsButtton = styled(Button)({
  minWidth: 0,
  "& img": {
    opacity: 0.6,
  },
  "&:hover": {
    "& img": {
      opacity: 1,
    },
  },
});



const MyMenu = ({ user, index }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

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
      <StyledDetailsButtton
        id="basic-button"
        aria-controls={isOpen ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        onClick={handleClick}
        style={{
        }}
      >
        <img alt="profile" src={detailsIcon} />
      </StyledDetailsButtton>
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
         
          <Button>
            User Details
          </Button>
        </MenuItem>
        <MenuItem >
          
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MyMenu;
