import React, { useState } from "react";
import { Button, Popover } from "@mui/material";
import styled from "@emotion/styled";
import closeIcon from "./assets/Close Icon.svg";

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
  color: "black",
  textTransform: "capitalize",
});

const MyPopover = ({ user, index }) => {
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
      <StyledDetailsButtton
        id="basic-button"
        aria-controls={isOpen ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        onClick={handleClick}
      >
        {user.firstName} {user.lastName}
      </StyledDetailsButtton>
      <Popover
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        style={{ fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif" }}
      >
        <div style={{ width: 257 }}>
          <Button
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              padding: 5,
              minWidth: 0,
            }}
            onClick={handleClose}
          >
            <img alt="close" src={closeIcon} />
          </Button>
          <div style={{ display: "flex", background: "#3F7FA2", height: 119 }}>
            <div
              style={{
                width: 65,
                height: 65,
                borderRadius: 32.5,
                border: "1px solid rgba(255,255,255, .81)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1
                style={{
                  fontWeight: "normal",
                  color: "white",
                  textTransform: "uppercase",
                }}
              >
                {user.firstName.charAt(0)}
              </h1>
            </div>
            <div>
              <h2
                style={{
                  color: "white",
                  opacity: 0.9,
                  textTransform: "capitalize",
                }}
              >
                {user.firstName} {user.lastName}
              </h2>
              <p style={{ color: "white", opacity: 0.5, fontSize: "16px" }}>
                {user.position}
              </p>
            </div>
          </div>
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
        </div>
      </Popover>
    </div>
  );
};

export default MyPopover;
