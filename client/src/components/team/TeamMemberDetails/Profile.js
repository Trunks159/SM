import React, { useState, useEffect } from "react";
import "./profile.css";
import { useLocation, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Availability from "./Availability/Availability";
import RequestOffs from "./RequestOffs/RequestOffs";
import Details from "./Details/Details";
import Header from "./Header";
import { Tabs, Tab, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import RequestOffsMini from "./RequestOffs/RequestOffsMini";

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

const StyledTabs = styled(Tabs)(({ theme }) => ({
  margin: "10px auto 0px auto",
  height: "min-content",
  "@media (min-width : 943px)": {
    display: "none",
  },
}));

function Profile({ user }) {
  const location = useLocation();
  const screenWidth = useSelector((state) => state.screenWidth);
  const isDesktop = screenWidth >= 943;
  const [currentTab, setCurrentTab] = useState(0);
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
      setCurrentTab(2);
    }
  }, [location]);

  const tabs = [
    { label: "details", to: `/team/profile/${user.id}` },
    { label: "availablity", to: `/team/profile/${user.id}` },
    { label: "request offs", to: `/team/profile/${user.id}/requestoffs` },
  ];

  const { firstName, username } = user;

  return (
    <div className="profile">
      <StyledTabs
        value={currentTab}
        onChange={(e, newValue) => setCurrentTab(newValue)}
      >
        {tabs.map((tab, index) => (
          <StyledTab key={index} component={Link} value={index} {...tab} />
        ))}
      </StyledTabs>

      <Route
        exact
        path="/team/profile/:userId"
        render={() => (
          <>
            <Header
              firstName={firstName}
              isHidden={!isDesktop && currentTab !== 0}
              text1={username || firstName}
              text2="View and edit your information here"
            />
            <div className="detailability">
              <RequestOffsMini user={user} />
              <Details user={user} isHidden={!isDesktop && currentTab !== 0} />
              <Divider orientation="vertical" sx={{ margin: "0px 30px" }} />
              <Availability
                availability={user.availability}
                handleSave={handleSave}
                isHidden={!isDesktop && currentTab !== 1}
                user={user}
              />
            </div>
          </>
        )}
      />

      <Route
        path="/team/profile/:userId/requestoffs"
        render={() => (
          <RequestOffs
            handleSave={handleSave}
            user={user}
            isDesktop={isDesktop}
          />
        )}
      />
    </div>
  );
}

export default Profile;
