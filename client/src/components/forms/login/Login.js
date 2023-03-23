import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Checkbox, Button } from "@mui/material";
import LockIcon from "@material-ui/icons/Lock";
import {
  SolidButton,
  OutlinedButton,
  MyInput,
  RememberMe,
  Header,
} from "../StyledComponents";
import "../forms.css";

//ACTIONS

function userLoggedIn(user) {
  return {
    type: "USER_LOGGED_IN",
    payLoad: user,
  };
}

function Login({ users }) {
  const [state, setState] = useState({
    username: "",
    password: "",
    remember: false,
    usernameErrors: null,
    passwordErrors: null,
  });
  const { username, password, remember, usernameErrors, passwordErrors } =
    state;

  const dispatch = useDispatch();

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function handleCheckbox(e) {
    setState({ ...state, remember: e.target.checked });
  }

  function displayError({ name, message }) {
    setState({
      ...state,
      [name]: message,
    });
    setTimeout(() => {
      setState({ ...state, name: null });
    }, 4000);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const user = users.find((user) => username.trim() === user.username);

    if (!user) {
      return displayError({
        message: "Bad username...",
        name: "usernameErrors",
      });
    }
    fetch("/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.trim(),
        password: password.trim(),
        remember,
      }),
    }).then((response) =>
      response.json().then((data) => {
        if (response.ok) {
          return dispatch(userLoggedIn(data));
        }
        data === "password" &&
          displayError({ message: "Bad password...", name: "passwordErrors" });
        data === "username" &&
          displayError({ message: "Bad username...", name: "usernameErrors" });
      })
    );
  }

  return (
    <form className="authentification-form" onSubmit={handleSubmit}>
      <Header>Sign In</Header>
      <Button
        onClick={() => {
          setState({ ...state, username: "admin", password: "password" });
        }}
        variant="contained"
        sx={{ position: "absolute", textTransform: "none", top: 0 }}
      >
        Hit this button to login as: username : 'admin', password: 'password'
      </Button>
      <div className="inputs">
        <MyInput
          required
          error={usernameErrors}
          variant="outlined"
          name="username"
          label="Enter Username"
          onChange={handleChange}
          value={username}
          helperText={usernameErrors}
        />
        <MyInput
          error={passwordErrors}
          required
          variant="outlined"
          name="password"
          label="Enter Password"
          onChange={handleChange}
          type="password"
          helperText={passwordErrors}
          value={password}
        />
      </div>

      <Link className="forgot-password" to="/">
        Forgot Password?
      </Link>
      <RememberMe
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
      <SolidButton type="submit" endIcon={<LockIcon />}>
        Sign In
      </SolidButton>
      <p style={{ fontWeight: 300, fontSize: 13, marginTop: 40 }}>
        Haven't made an account yet?
      </p>
      <Link style={{ textDecoration: "none" }} to="/register">
        <OutlinedButton variant="outlined">Register</OutlinedButton>
      </Link>
    </form>
  );
}

export default Login;
