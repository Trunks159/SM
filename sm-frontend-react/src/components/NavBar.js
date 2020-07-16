import React, { Component } from "react";

class NavBar extends Component {
  state = {
    users: this.props.users,
  };

  handleClick = (e) => {
    e.preventDefault();
    console.log(1);
  };
  render() {
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
          <hr />
          <p style={{ textAlign: "center" }}>
            <strong>Workers</strong>
          </p>
          <hr />
          {this.state.users.map((user) => (
            <div className="worker">
              <p className="w-name">{user.first_name}</p>
              <button className="plus-btn" onClick={() => this.handleClick}>
                <p className="plus"> +</p>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default NavBar;
