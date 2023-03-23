import React, { useState, useEffect } from "react";
import "./profile.css";
import { Switch, useLocation, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Availability from "./Availability/Availability";
import RequestOffs from "./RequestOffs/RequestOffs";
import Details from "./Details/Details";
import Header from "./Header";
import { Tabs, Tab, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function updateAlert(alert) {
  return {
    type: "UPDATE_ALERT",
    payLoad: alert,
  };
}

const StyledTab = styled(Tab)({
  textTransform: "capitalize",
  fontWeight: "normal",
  minHeight: 0,
  "& p": {
    margin: 0,
  },
});

const StyledTabs = styled(Tabs)({
  margin: "10px auto 0px auto",
  height: "min-content",
});

function Profile({ user }) {
  const location = useLocation();
  const screenWidth = useSelector((state) => state.screenWidth);
  const isDesktop = screenWidth >= 600;
  const [state, setState] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    position: user.position,
    username: user.username,
    currentTab: location.pathname.includes("requestoffs") ? 2 : 0,
  });
  const { firstName, lastName, position, username, currentTab } = state;
  const dispatch = useDispatch();
  function handleSave(changedProps) {
    if (changedProps) {
      fetch(`/api/users?user-id=${user.id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changedProps),
      }).then((response) =>
        response.json().then((data) => {
          if (response.ok) {
            return dispatch(
              updateAlert({
                content: "Changes Saved",
                severity: "success",
                title: "Success",
              })
            );
          }
          throw new Error(data);
        })
      );
    }
  }

  useEffect(() => {
    //if request off in, use it otherwise ignore
    if (location.pathname.includes("requestoffs")) {
      setState({ ...state, currentTab: 2 });
    }
  }, [location]);

  const tabs = [
    { label: "details", to: `/team/profile/${user.id}` },
    { label: "availablity", to: `/team/profile/${user.id}` },
    { label: "request offs", to: `/team/profile/${user.id}/requestoffs` },
  ];

  return (
    user && (
      <div className="tm-details">
        <StyledTabs
          value={currentTab}
          onChange={(e, newValue) =>
            setState({ ...state, currentTab: newValue })
          }
        >
          {tabs.map((tab, index) => (
            <StyledTab key={index} component={Link} value={index} {...tab} />
          ))}
        </StyledTabs>
        <div className="main-div">
          <Header
            firstName={firstName}
            lastName={lastName}
            username={username}
            isHidden={currentTab !== 0}
          />
          <Route
            exact
            path="/team/profile/:userId"
            render={() => (
              <>
                <Details
                  user={user}
                  isHidden={!isDesktop && currentTab !== 0}
                />
                <Availability
                  availability={user.availability}
                  handleSave={handleSave}
                  isHidden={!isDesktop && currentTab !== 1}
                />
              </>
            )}
          />

          <Route
            path="/team/profile/:userId/requestoffs"
            render={() => (
              <RequestOffs
                requestOffs={user.requestOffs}
                handleSave={handleSave}
                user={user}
              />
            )}
          />
        </div>
      </div>
    )
  );
}

export default Profile;
