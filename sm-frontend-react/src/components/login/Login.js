import React, { Component } from "react";
import { Alert } from "@material-ui/lab";

class Login extends Component {
  state = {
    username: "",
    password: "",
    remember: false,
    username_errors: null,
    password_errors: null,
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
    const { users, postReq, notifyUser } = this.props;

    const user = users.find((user) => user.username === username);

    if (user) {
      let x = postReq("/user_login", {
        username: username,
        password: password,
        remember: remember,
      });
      x.then((data) =>
        data.json().then(({ current_user }) => {
          if (current_user.is_authenticated) {
            notifyUser({
              content: username + " is now logged in!",
              title: "Success",
              severity: "success",
            });
          } else {
            this.setState({
              password_errors: (
                <Alert variant="outlined" severity="error">
                  Bad Password
                </Alert>
              ),
            });
            setTimeout(() => {
              this.setState({ password_errors: null });
            }, 4000);
          }
        })
      );
    } else {
      console.log("Something");
      this.setState({
        username_errors: (
          <Alert variant="outlined" severity="error">
            Bad Username
          </Alert>
        ),
      });
      setTimeout(() => {
        this.setState({ username_errors: null });
      }, 4000);
    }
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
        {this.state.username_errors && (
          <p className="username-errors">{this.state.username_errors}</p>
        )}
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
        {this.state.password_errors && (
          <p className="password-errors">{this.state.password_errors}</p>
        )}
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
