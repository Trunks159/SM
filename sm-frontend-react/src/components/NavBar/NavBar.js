import React from "react";
import { Link } from "react-router-dom";
import Users from "./Users";
import SwipeableTemporaryDrawer from "./UsersDrawer"


const NavBar = ({ users, current_user, logoutUser, Thumbnail }) => {

  const isAuthenticated = (user, logoutUser, Thumbnail) => {
    return (
      <React.Fragment>
          <Thumbnail user={user} />
          <Link className="nav-link" onClick={logoutUser}>Logout</Link>
        {isManager(user)}
      </React.Fragment>
    );
  };

  const notAuthenticated = () => {
    return (
      <React.Fragment>
          <Link className="nav-link login" to="/login">Login</Link>
          <Link className="nav-link register" to="/register">Register</Link>
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
    <nav className="nav-bar">
      <SwipeableTemporaryDrawer users = {users}/>
      <Link className="nav-logo" to="/">
        <img
          src="http://localhost:5000/static/images/logo.png"
          alt="Scheduletron"
        />
      </Link>
        {current_user.is_authenticated
          ? isAuthenticated(current_user, logoutUser, Thumbnail)
          : notAuthenticated()}
      {/*
      <Users users={users} />*/}
        
    </nav>
  );
};

export default NavBar;
