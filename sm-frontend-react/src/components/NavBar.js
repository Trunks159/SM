import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  state = {
    current_user: {
      is_authenticated: false,
    },
    redirect: null,
  };

  isAuthenticated(user, logoutUser) {
    return (
      <React.Fragment>
        <li className="nav-link">
          <Link to="/">
            <div className="user-thumbnail">
              <p>
                {user.first_name} {user.last_name}
              </p>
              <h5 style={{ color: user.color }}>
                {user.first_name[0].toUpperCase()}
              </h5>
            </div>
          </Link>
        </li>
        <li id="logout">
          <button className="logout" onClick={logoutUser}>
            Logout
          </button>
        </li>
        {this.isManager(user)}
      </React.Fragment>
    );
  }

  isManager(user) {
    if (user.position) {
      return (
        <li className="nav-link">
          <Link to="/">Add User</Link>
        </li>
      );
    }
  }

  render() {
    const { handler, users, current_user, logoutUser } = this.props;
    return (
      <ul className="nav-bar">
        <li>
          <Link to="/" className="logo">
            <img
              src="http://localhost:5000/static/images/logo.png"
              alt="test"
            />
          </Link>
        </li>
        {current_user.is_authenticated ? (
          this.isAuthenticated(current_user, logoutUser)
        ) : (
          <React.Fragment>
            <li className="nav-link">
              <Link to="/scheduletron5000">S.T. 5000</Link>
            </li>
            <li className="nav-link">
              <Link to="/login">Login</Link>
            </li>
            <li className="nav-link">
              <Link to="/register">Register</Link>
            </li>
          </React.Fragment>
        )}
        <li>
          <h4>Workers</h4>
          <ul>
            {users.length > 0
              ? users.map((user, index) => (
                  <li className="user" key={user.id}>
                    <button
                      id={index % 2 === 0 ? "darker" : "lighter"}
                      onClick={() => handler(user)}
                      key={user.id}
                    >
                      {user.first_name[0].toUpperCase() +
                        user.first_name.slice(1)}
                    </button>
                  </li>
                ))
              : null}
          </ul>
        </li>
      </ul>
    );
  }
}

export default NavBar;
