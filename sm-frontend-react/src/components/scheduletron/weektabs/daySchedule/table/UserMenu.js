import React, { useState } from "react";
import { Menu, MenuItem, Button } from "@material-ui/core";
import detailsIcon from "./assets/Details Icon.svg";
import removeIcon from "./assets/Close Icon.svg";
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

//ACTIONS

const removeFromScheduled = (userId) => ({
  type: "REMOVE_FROM_SCHEDULED",
  payLoad: userId,
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

  function handleRemove(e){
    dispatch(removeFromScheduled(index));
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
          <Button  onClick = {handleRemove} to="/" startIcon={<img alt = 'remove team member' src = {removeIcon}/> }>
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
