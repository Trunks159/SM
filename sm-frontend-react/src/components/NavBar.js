import React, { Component } from "react";

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
      <div className="box-1">
        <a href="/" className="a1">
          <img
            className="logo"
            src="http://localhost:5000/static/images/logo.png"
            alt="test"
          />
        </a>
        <div className="a2">
          <ul className="nav-items">
            {current_user.is_authenticated ? (
              this.isAuthenticated(current_user, Thumbnail, logoutUser)
            ) : (
              <div>
                <li>
                  <a href="/login">Login</a>
                </li>
                <li>
                  <a href="/">Register</a>
                </li>
              </div>
            )}
          </ul>

          <p>
            <strong>Workers</strong>
          </p>
          <div className="vertical-menu">
            {users.length > 0
              ? users.map((user) => (
                  <button
                    className="btn"
                    onClick={() => handler(user)}
                    key={user.id}
                  >
                    {user.first_name[0].toUpperCase() +
                      user.first_name.slice(1)}
                  </button>
                ))
              : null}
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
