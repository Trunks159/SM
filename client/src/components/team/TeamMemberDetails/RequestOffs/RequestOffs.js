import React, { useState, useEffect } from "react";
import "./requestoffs.css";
import RequestOffMenu from "./RequestOffMenu";
import RequestCard from "./RequestCard";
import dayjs from "dayjs";
import { Route, Switch } from "react-router-dom";
import AddRequest from "./AddRequest";
import Header from "../Header";

function RequestOffs(props) {
  const { user, isDesktop } = props;
  const [requestOffs, setRequestOffs] = useState(props.user.requestOffs);

  function updateRequests(newValue) {
    setRequestOffs(newValue);
  }

  const upcomingRequests = requestOffs.filter(({ start }) =>
    dayjs(start).isAfter(dayjs())
  );
  const pastRequests = requestOffs.filter(({ end }) =>
    //need requests with end date before today
    dayjs(end).isBefore(dayjs())
  );

  return (
    <div className="request-offs">
      {isDesktop && (
        <Header
          text1="Request Offs"
          text2="Edit, view, add, search for,  and save your request offs here"
          firstName={user.firstName}
        />
      )}

      <Switch>
        <Route
          exact
          path="/team/profile/:userId/requestoffs"
          render={() => {
            return (
              <div className="requestoff-lists">
                <RequestOffMenu />
                <div className="requests upcoming-requests">
                  <h3>Your Upcoming Requests</h3>
                  {!upcomingRequests || upcomingRequests.length === 0 ? (
                    <p>You currently have no upcoming requests</p>
                  ) : (
                    <ul>
                      {upcomingRequests.map(({ start, end }) => (
                        <RequestCard start={dayjs(start)} end={dayjs(end)} />
                      ))}
                    </ul>
                  )}
                </div>
                <div className="requests past-requests">
                  <h3>Your Past Requests</h3>
                  {!pastRequests || pastRequests.length === 0 ? (
                    <p>You currently have no upcoming requests</p>
                  ) : (
                    <ul>
                      {pastRequests.map(({ start, end }) => (
                        <RequestCard start={dayjs(start)} end={dayjs(end)} />
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          }}
        />
        <Route
          path={"/team/profile/:userId/requestoffs/add"}
          render={() => (
            <AddRequest
              allRequests={requestOffs}
              user={user}
              updateRequests={updateRequests}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default RequestOffs;
