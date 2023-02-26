import React, { useState } from "react";
import { Checkbox } from "@material-ui/core";
import { Link } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import "../forms.css";
import {
  SolidButton,
  OutlinedButton,
  MyInput,
  RememberMe,
  Header,
} from "../StyledComponents";
import { useDispatch } from "react-redux";

//ACTIONS
const updateCurrentUser = (newUser) => ({
  type: "UPDATE_CURRENT_USER",
  payLoad: newUser,
});

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

  const dispatch = useDispatch();

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function handleCheckbox(e) {
    setState({ ...state, remember: e.target.checked });
  }

  function handleSuccessfulLogin(newUser) {
    notifyUser({
      content: username + " is now logged in!",
      title: "Login Successful",
      severity: "success",
    });
    dispatch(updateCurrentUser(newUser));
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
    fetch("/login_user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, remember }),
    }).then((data) =>
      data.json().then((response) => {
        if (response.wasSuccessful) {
          handleSuccessfulLogin(response.currentUser);
        } else {
          response.errorType === "password" && handleBadPassword();
          response.errorType === "username" && handleBadUsername();
        }
      })
    );
  }

  return (
    <form className="authentification-form" onSubmit={handleSubmit}>
      <Header>Sign In</Header>
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
      <SolidButton endIcon={<LockIcon />}>Sign In</SolidButton>
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