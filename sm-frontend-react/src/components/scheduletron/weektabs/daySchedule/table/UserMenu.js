import React, { useState } from "react";
import { Menu, MenuItem, Button, Paper } from "@material-ui/core";
import closeIcon from './assets/Close Icon.svg';

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
        style={{}}
      >
        {user.firstName} {user.lastName}
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
        <MenuItem style = {{position : 'relative'}}>
          <Button style = {{position : 'absolute', top : 0, right : 0, padding : 5, minWidth : 0}}>
            <img alt = 'close' src = {closeIcon}/>
          </Button>
          <h1 style = {{textTransform : 'uppercase'}}>{user.firstName.charAt(0)}</h1>
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <p>{user.position}</p>
          <div>
            <h3>Availability</h3>
            <ul>The availability stuff</ul>
          </div>
          <div>
            <h3>Request Offs</h3>
            <ul>
              {user.requestOffs &&
                user.requestOffs.map((reqOff) => <li>Info</li>)}
            </ul>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MyMenu;
