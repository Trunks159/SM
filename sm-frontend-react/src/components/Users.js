import React from "react";
import UserThumbnail from "./UserThumbnail";

const Users = ({ users }) => (
  <ul className="scrollmenu">
    {users.map((user) => (
      <li key={user.id}>
        <UserThumbnail user={user} />
      </li>
    ))}
  </ul>
);

export default Users;
