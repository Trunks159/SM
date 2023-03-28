import React, { useEffect, useState } from "react";
import { Button, Popover, CircularProgress } from "@mui/material";
import styled from "@emotion/styled";
import closeIcon from "./assets/Close Icon.svg";
import RequestCard from "../../../team/TeamMemberDetails/RequestOffs/RequestCard";
import dayjs from "dayjs";

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

const MyPopover = ({ firstName, lastName, id }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  function handleClick(e) {
    setAnchorEl(e.target);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function fetchUser(id) {
    fetch(`/api/users?id=${id}`).then((response) =>
      response.json().then((data) => {
        if (response.ok) {
          return setUser(data);
        }
        console.log("Error of some sort");
      })
    );
  }

  const isOpen = Boolean(anchorEl);

  useEffect(() => {
    if (isOpen && !user) {
      fetchUser(id);
    }
  }, [isOpen]);

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
        {firstName} {lastName}
      </StyledDetailsButtton>

      <Popover
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        style={{}}
        sx={{
          fontFamily: "Segoe UI",
        }}
      >
        {user ? (
          <div style={{ width: 257, maxHeight: 400, overflowY: "auto" }}>
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
            <div
              style={{ display: "flex", background: "#3F7FA2", height: 119 }}
            >
              <div
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: "50%",
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
            {user.requestOffs.length && (
              <div>
                <h3>Request Offs</h3>
                <ul>
                  {user.requestOffs.map(({ start, end }) => (
                    <RequestCard start={dayjs(start)} end={dayjs(end)} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <CircularProgress />
        )}
      </Popover>
    </div>
  );
};

export default MyPopover;
