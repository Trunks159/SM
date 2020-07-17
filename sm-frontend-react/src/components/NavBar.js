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
      <hr />
      <p style={{ textAlign: "center" }}>
        <strong>Workers</strong>
      </p>
      <hr />
      {users &&
        users.map((user) => (
          <div className="worker">
            <p className="w-name">{user.first_name}</p>
            <button className="plus-btn" onClick={() => handler(user)}>
              +
            </button>
          </div>
        ))}
    </div>
  </div>
);

export default NavBar;
