import React, { Component } from "react";

class Registration extends Component {
  state = {
    username: "",
    password: "",
    password_confirmation: "",
    registrationErrors: "",
  };

  handleSubmit(e) {
    console.log("form submitted!");
    e.preventDefault();
  }
  handleChange(e) {
    console.log("handle change", e);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password_confirmation"
            placeholder="Password Confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Registration;
