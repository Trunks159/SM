import React, { useState } from "react";
import {useStyles, StyledButton} from './LoginStyles'
import {
  TextField,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";
import { Link } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import "./login.css";
import FancyDivider from "./FancyDivider";


function Login({ users, notifyUser }) {
  const [state, setState] = useState({
    username: "",
    password: "",
    remember: false,
    usernameErrors: null,
    passwordErrors: null,
  });
  const { username, password, remember, usernameErrors, passwordErrors } =
    state;
  const classes = useStyles();

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function handleCheckbox(e) {
    setState({ ...state, remember: e.target.checked });
  }

  function handleSuccessfulLogin() {
    notifyUser({
      content: username + " is now logged in!",
      title: "Login Successful",
      severity: "success",
    });
  }

  function handleBadPassword() {
    setState({
      ...state,
      passwordErrors: "Incorrect password...",
    });
    setTimeout(() => {
      setState({ ...state, passwordErrors: null });
    }, 4000);
  }

  function handleBadUsername() {
    setState({
      ...state,
      usernameErrors: "Incorrect username...",
    });
    setTimeout(() => {
      setState({ ...state, usernameErrors: null });
    }, 4000);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const user = users.find((user) => user.username === username);

    if (user) {
      fetch("/user_login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, remember }),
      }).then((data) =>
        data.json().then((current_user) => {
          if (current_user.isAuthenticated) {
            handleSuccessfulLogin();
          } else {
            handleBadPassword();
          }
        })
      );
    } else {
      handleBadUsername();
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
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
        onChange={handleChange}
        helperText={usernameErrors}
      />
      <TextField
        style={{ marginTop: 25 }}
        error={passwordErrors}
        required
        variant="outlined"
        className={classes.input + " password"}
        name="password"
        label="Enter Password"
        onChange={handleChange}
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
            checked={remember}
            onChange={handleCheckbox}
            name="remember"
            primary
          />
        }
        label="Remember Me"
      />
      <StyledButton
        className={classes.submit}
        type="submit"
        endIcon={<LockIcon />}
      >
        Sign In
      </StyledButton>
      <p style={{ fontWeight: 300, fontSize: 13, marginTop: 40 }}>
        Haven't made an account yet?
      </p>
      <Link style={{ textDecoration: "none" }} to="/register">
        <StyledButton className={classes.register} variant="outlined">
          Register
        </StyledButton>
      </Link>
    </form>
  );
}

export default Login;
