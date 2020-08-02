import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  isAuthenticated(user, Thumbnail, logoutUser) {
    return (
      <div>
        <li>
          <button onClick={logoutUser}>Logout</button>
        </li>
        <li>
          <a href="/">
            <Thumbnail user={user} />
          </a>
        </li>
        {this.isManager(user)}
      </div>
    );
  }

  isManager(user) {
    if (user.position) {
      return (
        <li>
          <a href="/">Add User</a>
        </li>
      );
    }
  }

  render() {
    const { handler, users, current_user, Thumbnail, logoutUser } = this.props;

    return (
      <div className="nav-bar">
        <Link to="/" className="logo">
          <img
            src="http://localhost:5000/static/images/logo.png"
            alt="test"
            width="45px"
          />
        </Link>
        <ul className="nav-items">
          {current_user.is_authenticated ? (
            this.isAuthenticated(current_user, Thumbnail, logoutUser)
          ) : (
            <div>
              <li>
                <Link to="/scheduletron5000">Scheduletron5000</Link>
              </li>
              <li>
                <Link className="login-btn" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </div>
          )}
        </ul>
        <div className="vertical-menu">
          <p>
            <strong>Workers</strong>
          </p>
          {users.length > 0
            ? users.map((user, index) => (
                <button
                  id={index % 2 === 0 ? "darker" : "lighter"}
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
    );
  }
}

export default NavBar;
