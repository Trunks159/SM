import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Paper,
  Button,
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
  submit: {
    borderRadius: 7,
    background: "rgba(7, 145, 182, 1)",
    transitionDuration: ".2s",
    opacity: 1,
    "&:hover": {
      opacity: 0.8,
      background: "rgba(0, 203, 255, 1)",
    },
    width: 145,
    height: 45,
    marginLeft: "auto",
    marginTop: 50,
    "& .MuiButton-label": {
      textTransform: "none",
      fontWeight: 700,
      fontSize: 20,
      color: "white",
    },
  },
});

class Login extends Component {
  state = {
    username: "",
    password: "",
    remember: false,
    usernameErrors: null,
    passwordErrors: null,
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
      passwordErrors: "Incorrect password",
    });
    setTimeout(() => {
      this.setState({ passwordErrors: null });
    }, 4000);
  };

  handleBadUsername = () => {
    this.setState({
      usernameErrors: "This username wasn't found in our database",
    });
    setTimeout(() => {
      this.setState({ usernameErrors: null });
    }, 4000);
  };

  render() {
    const { classes } = this.props;
    const { usernameErrors, passwordErrors } = this.state;
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <header>
          <h1>Sign In</h1>
          <FancyDivider />
        </header>
        <TextField
          required
          error={usernameErrors}
          variant="outlined"
          className={classes.input}
          name="username"
          label="Enter Username"
          onChange={this.handleChange}
          helperText={usernameErrors}
        />
        <TextField
          error={passwordErrors}
          required
          variant="outlined"
          className={classes.input}
          name="password"
          label="Enter Password"
          onChange={this.handleChange}
          type="password"
          helperText={passwordErrors}
        />
        <Link className="forgot-password" to="/">
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
        <Button className={classes.submit} type="submit" endIcon={<LockIcon />}>
          Sign In
        </Button>
        <div style={{ display: "flex" }}>
          <p>Don't have an account? Register Here!</p>
          <Link to="/register">Register</Link>
        </div>
      </form>
    );
  }
}
export default withStyles(styles)(Login);
