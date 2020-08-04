import React from "react";
import { Link } from "react-router-dom";

const Thumbnail = ({ user }) => (
  <Link to={`/user/${user.username}`}>
    <div className="user-thumbnail">
      <p>
        {user.first_name} {user.last_name}
      </p>
      <h5 style={{ color: user.color }}>{user.first_name[0].toUpperCase()}</h5>
    </div>
  </Link>
);

export default Thumbnail;
