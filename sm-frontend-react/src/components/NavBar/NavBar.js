import React, { Component } from "react";
import { Link } from "react-router-dom";
import Users from "./Users";

const NavBar = ({ users, current_user, logoutUser, Thumbnail }) => {
  const isAuthenticated = (user, logoutUser, Thumbnail) => {
    return (
      <React.Fragment>
        <li>
          <Thumbnail user={user} />
        </li>
        <li className="nav-link">
          <Link onClick={logoutUser}>Logout</Link>
        </li>
        {isManager(user)}
      </React.Fragment>
    );
  };

  const notAuthenticated = () => {
    return (
      <React.Fragment>
        <li className="nav-link">
          <Link to="/login">Login</Link>
        </li>
        <li className="nav-link">
          <Link to="/register">Register</Link>
        </li>
      </React.Fragment>
    );
  };

  const isManager = (user) => {
    if (user.position) {
      return (
        <li className="nav-link">
          <Link to="/">Add User</Link>
        </li>
      );
    }
  };
  return (
    <div className="nav-bar">
      <Link className="nav-header" to="/">
        <img
          src="http://localhost:5000/static/images/logo.png"
          alt="Scheduletron"
        />
      </Link>
      <ul>
        {current_user.is_authenticated
          ? isAuthenticated(current_user, logoutUser, Thumbnail)
          : notAuthenticated()}
      </ul>
      <Users users={users} />
    </div>
  );
};

export default NavBar;
