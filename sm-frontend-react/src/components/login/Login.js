import React, { Component } from "react";
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

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, remember } = this.state;
    this.props.postReq("/user_login", {
      username: username,
      password: password,
      remember: remember,
    });
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
}
export default Login;
