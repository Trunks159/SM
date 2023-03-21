import React, { useState, useEffect } from "react";
import "./profile.css";
import { Switch, useLocation, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Availability from "./Availability/Availability";
import RequestOffs from "./RequestOffs/RequestOffs";
import Details from "./Details/Details";
import Header from "./Header";
import { Tabs, Tab } from "@mui/material";

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
  console.log(`CHange: `, user);
  const location = useLocation();
  const [state, setState] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    position: user.position,
    username: user.username,
    currentTab: location.pathname.split("/").find((x) => x === "requestoffs")
      ? 2
      : 0,
  });

  const { firstName, lastName, position, username, currentTab } = state;

  function handleSave(changedProps) {
    if (changedProps) {
      fetch("/api/update_user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changedProps),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("Maybe It saved");
        });
    }
  }

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (location.pathname.includes("requestoffs")) {
      setState({ ...state, currentTab: 2 });
    }
  }, [location]);

  return (
    user && (
      <div className="tm-details">
        <StyledTabs
          value={currentTab}
          onChange={(e, newValue) =>
            setState({ ...state, currentTab: newValue })
          }
        >
          {["details", "availability", "request offs"].map((tab, index) => (
            <StyledTab
              key={index}
              component={Link}
              to={
                index === 2
                  ? `/team/profile/${user.id}/requestoffs`
                  : `/team/profile/${user.id}`
              }
              value={index}
              label={<p>{tab}</p>}
            />
          ))}
        </StyledTabs>
        <div className="main-div">
          <Header
            firstName={firstName}
            lastName={lastName}
            username={username}
            isHidden={currentTab !== 0}
          />
          <Switch>
            <Route
              exact
              path="/team/profile/:userId"
              render={() => (
                <>
                  <Details user={user} isHidden={currentTab !== 0} />
                  <Availability
                    availability={user.availability}
                    handleSave={handleSave}
                    isHidden={currentTab !== 1}
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
          </Switch>
        </div>
      </div>
    )
  );
}

export default Profile;
