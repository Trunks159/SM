import React, { Component } from "react";
import { Redirect } from "react-router-dom";
class Login extends Component {
  state = {
    username: "",
    password: "",
    remember: false,
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleCheckbox = (e) => {
    this.setState({
      remember: e.target.checked,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, remember } = this.state;
    const rawResponse = await fetch("/user_login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        remember: remember,
      }),
    });
    const content = await rawResponse.json();
    this.setState({ current_user: content.current_user });
  };

  loginForm() {
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
        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          onChange={this.handleChange}
          type="password"
          placeholder="Enter Password"
          name="password"
          required
        />
        <button type="submit">Login</button>
        <label>
          <input
            onChange={this.handleCheckbox}
            type="checkbox"
            defaultChecked="checked"
            name="remember"
          />
          Remember me
        </label>

        <span className="psw">
          Forgot <a href="/">password?</a>
        </span>
      </form>
    );
  }

  render() {
    return this.loginForm();
  }
}
export default Login;
