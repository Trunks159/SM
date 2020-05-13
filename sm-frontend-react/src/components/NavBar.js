import React, { Component } from "react";

class NavBar extends Component {
  state = {
    current_user: this.props.current_user,
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            {this.state.current_user.anonymous || (
              <li className="nav-item">
                <a className="nav-link" href="#">
                  {this.state.current_user.username}
                </a>
              </li>
            )}
            {this.state.current_user.anonymous || (
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Logout
                </a>
              </li>
            )}
            {this.state.current_user.anonymous && (
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Login
                </a>
              </li>
            )}

            {this.state.current_user.anonymous && (
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Register
                </a>
              </li>
            )}
            {this.state.current_user.position && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Schedule
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">
                    Edit Schedule
                  </a>
                  <a className="dropdown-item" href="#">
                    Add Schedule
                  </a>
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
