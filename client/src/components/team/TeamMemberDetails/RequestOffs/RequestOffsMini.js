import React from "react";
import { Link } from "react-router-dom";
import forwardIcon from "./assets/Forward Icon.svg";
import RequestCard from "./RequestCard";
import dayjs from "dayjs";

function RequestOffsMini({ user }) {
  const upcomingRequests = user.requestOffs.filter(({ start }) =>
    dayjs(start).isAfter(dayjs())
  );
  return (
    <div className="requestoffs-mini">
      <h3 className="title">Upcoming Request Offs</h3>
      <Link to={`/team/profile/${user.id}/requestoffs`}>
        For More <img src={forwardIcon} />
      </Link>

      <ul>
        {upcomingRequests.length ? (
          upcomingRequests.map(({ start, end }) => (
            <RequestCard start={dayjs(start)} end={dayjs(end)} />
          ))
        ) : (
          <p>You have no upcoming requests</p>
        )}
      </ul>
    </div>
  );
}

export default RequestOffsMini;
