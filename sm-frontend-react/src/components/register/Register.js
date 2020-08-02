import React, { Component } from "react";

class Register extends Component {
  state = {
    username: "",
    password: "",
    confirm_passord: "",
    position: "",
    first_name: "",
    last_name: "",
  };
  handleSubmit() {
    console.log("Form Submitted");
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <b>Username</b>
        </label>
        <input
          onChange={this.handleChange}
          type="text"
          placeholder="Enter Username"
          name="username"
          required
        />
        <label>
          <b>Password</b>
        </label>
        <input
          onChange={this.handleChange}
          type="password"
          placeholder="Enter Password"
          name="password"
          required
        />
        <label>
          <b>Confirm Password</b>
        </label>
        <input
          onChange={this.handleChange}
          type="password"
          placeholder="Confirm Password"
          name="confirm_password"
          required
        />
      </form>
    );
  }
}
export default Register;
