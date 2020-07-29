import React from "react";

const Thumbnail = ({ user }) => (
  <div className="user-thumbnail">
    <p>
      {user.first_name} {user.last_name}
    </p>
    <h1>{user.first_name[0].toUpperCase()}</h1>
  </div>
);

export default Thumbnail;
