import React from "react";

const NavBar = ({ handler, users }) => (
  <div className="box-1">
    <a href="/" className="a1">
      <img
        className="logo"
        src="http://localhost:5000/static/images/logo.png"
        alt="test"
      />
    </a>
    <div className="a2">
      <p>
        <strong>Workers</strong>
      </p>
      <div class="vertical-menu">
        {users.length > 0
          ? users.map((user) => (
              <button
                className="btn"
                onClick={() => handler(user)}
                key={user.id}
              >
                {user.first_name[0].toUpperCase() + user.first_name.slice(1)}
              </button>
            ))
          : null}
      </div>
    </div>
  </div>
);

export default NavBar;
