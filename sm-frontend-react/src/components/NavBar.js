import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  state = {
    current_user: {
      is_authenticated: false,
    },
    redirect: null,
  };

  isAuthenticated(user, logoutUser, Thumbnail) {
    return (
      <React.Fragment>
        <li className="nav-link">
          <Thumbnail user={user} />
        </li>
        <li className="nav-link">
          <Link to="/schduletron5000">
            <p>S.T. 5000</p>
          </Link>
        </li>
        <li className="nav-link">
          <Link to="/" className="logout" onClick={logoutUser}>
            <p>Logout</p>
          </Link>
        </li>
        {this.isManager(user)}
      </React.Fragment>
    );
  }

  isManager(user) {
    if (user.position) {
      return (
        <li className="nav-link">
          <Link to="/">
            <p>Add User</p>
          </Link>
        </li>
      );
    }
  }

  render() {
    const { users, current_user, logoutUser, Thumbnail } = this.props;
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
          this.isAuthenticated(current_user, logoutUser, Thumbnail)
        ) : (
          <React.Fragment>
            <li className="nav-link">
              <Link className="nav-item" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-link">
              <Link className="nav-item" to="/register">
                Register
              </Link>
            </li>
          </React.Fragment>
        )}
        <li>
          <h4>Workers</h4>
          <ul>
            {users.length > 0
              ? users.map((user, index) => (
                  <li className="user" key={user.id}>
                    <Link to={`/user/${user.username}`}>
                      <button key={user.id}>
                        {user.first_name[0].toUpperCase() +
                          user.first_name.slice(1)}
                      </button>
                    </Link>
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
