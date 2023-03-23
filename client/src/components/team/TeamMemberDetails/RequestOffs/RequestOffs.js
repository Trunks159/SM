import React, { useState } from "react";
import "./requestoffs.css";
import RequestOffMenu from "./RequestOffMenu";
import RequestCard from "./RequestCard";
import dayjs from "dayjs";
import { Route, Switch } from "react-router-dom";
import AddRequest from "./AddRequest";
import { Collapse } from "@mui/material";

function RequestOffs(props) {
  const { handleSave } = props;
  const [state, setState] = useState({
    requests: props.requestOffs || [],
    pastRequests:
      props.requestOffs &&
      props.requestOffs.filter(({ end }) =>
        //need requests with end date before today
        dayjs(end).isBefore(dayjs())
      ),
    upcomingRequests:
      props.requestOffs &&
      props.requestOffs.filter(({ start }) => dayjs(start).isAfter(dayjs())),
  });
  const { pastRequests, upcomingRequests } = state;
  return (
    <div className="request-offs">
      <RequestOffMenu />
      <Switch>
        <Route
          exact
          path="/team/profile/:userId/requestoffs"
          render={() => {
            return (
              <>
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
              </>
            );
          }}
        />
        <Route
          path={"/team/profile/:userId/requestoffs/add"}
          render={() => (
            <AddRequest allRequests={props.requestOffs} user={props.user} />
          )}
        />
      </Switch>
    </div>
  );
}

export default RequestOffs;
