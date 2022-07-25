import React, { Component } from "react";
import { Alert } from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Paper,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import "./login.css";
import FancyDivider from "./FancyDivider";

const styles = () => ({
  divider: {
    backgroundColor: "blue",
    height: 0.5,
    margin: "15px 0px",
  },
  input: {
    maxWidth: 260,
    margin: "10px 0px",
    marginBottom: 25,
    "& .MuiFormHelperText-root": {
      position: "absolute",
      bottom: -20,
    },
  },
  forgot: {
    textDecoration: "none",
    fontSize: 12,
  },
  rememberMe: {
    marginTop: 20,
    width: "max-content",
  },
});

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
    const { users, postReq } = this.props;
    const user = users.find((user) => user.username === username);

    if (user) {
      let x = postReq("/user_login", {
        username: username,
        password: password,
        remember: remember,
      });
      x.then((data) =>
        data.json().then((current_user) => {
          if (current_user.isAuthenticated) {
            this.handleSuccessfulLogin();
          } else {
            this.handleBadPassword();
          }
        })
      );
    } else {
      this.handleBadUsername();
    }
  };

  handleSuccessfulLogin = () => {
    this.props.notifyUser({
      content: this.state.username + " is now logged in!",
      title: "Login Successful",
      severity: "success",
    });
  };

  handleBadPassword = () => {
    this.setState({
      password_errors: "Incorrect password",
    });
    setTimeout(() => {
      this.setState({ password_errors: null });
    }, 4000);
  };

  handleBadUsername = () => {
    this.setState({
      username_errors: "This username wasn't found in our database",
    });
    setTimeout(() => {
      this.setState({ username_errors: null });
    }, 4000);
  };

  render() {
    const { classes } = this.props;
    const { username_errors, password_errors } = this.state;
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <div style={{margin : '70px 35px' }}>
          <header>
            <h1>Sign In</h1>
            <FancyDivider />
          </header>
          <TextField
            required
            error={username_errors}
            variant="outlined"
            className={classes.input}
            name="username"
            label="Enter Username"
            onChange={this.handleChange}
            helperText={username_errors}
          />
          <TextField
            error={password_errors}
            required
            variant="outlined"
            className={classes.input}
            name="password"
            label="Enter Password"
            onChange={this.handleChange}
            type="password"
            helperText={password_errors}
          />
          <Link className="forgotPassword" to="/">
            Forgot Password?
          </Link>
          <FormControlLabel
            className={classes.rememberMe}
            control={
              <Checkbox
                checked={this.state.remember}
                onChange={this.handleCheckbox}
                name="remember"
                primary
              />
            }
            label="Remember Me"
          />
          <Paper
            style={{
              display: "flex",
              width: 150,
              background: "#00CBFF",
              borderRadius: 7,
              marginLeft: "auto",
              marginTop: 50,
            }}
          >
            <button
              className="login-submitButton"
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<LockIcon />}
            >
              Login
            </button>
          </Paper>
        </div>
      </form>
    );
  }
}
export default withStyles(styles)(Login);
