import React from "react";
import { Link } from "react-router-dom";

const Users = ({ users }) => (
  <div className="nav-users">
    <p>Users</p>
    <ul>
      {users.length > 0
        ? users.map((user, index) => (
            <li key={user.id}>
              <Link to={`/user/${user.username}`}>
                <button>
                  {user.first_name[0].toUpperCase() + user.first_name.slice(1)}
                </button>
              </Link>
            </li>
          ))
        : null}
    </ul>
  </div>
);

export default Users;
