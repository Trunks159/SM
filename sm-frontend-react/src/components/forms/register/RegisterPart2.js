import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Alert } from "@mui/material";
import Notification from "./Notification";

import { SolidButton, MyInput, Header } from "../StyledComponents";

function RegisterPart2({ firstName, lastName, users }) {
  const [state, setState] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    usernameErrors: null,
    passwordErrors: null,
    confirmPasswordErrors: null,
    redirect: null,
  });

  const {
    username,
    password,
    confirmPassword,
    usernameErrors,
    passwordErrors,
    confirmPasswordErrors,
    redirect,
  } = state;

  function alertUser(errors) {
    let newState = { ...state };
    for (let error of errors) {
      newState[error.error] = <Alert severity="error">{error.message}</Alert>;
    }
    setState(newState);
    setTimeout(() => {
      let newState = { ...state };
      for (let error of errors) {
        newState[error.error] = null;
      }
      setState(newState);
    }, 4000);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let errors = [];
    users.find((user) => user.username === username) &&
      errors.push({
        error: "usernameErrors",
        message: "This username is already in use.",
      });
    confirmPassword !== password &&
      errors.push({
        error: "confirmPasswordErrors",
        message: "Confirm password and password are not the same",
      });

    if (errors.length) {
      alertUser(errors);
    } else {
      console.log("Running");
      fetch("/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          first_name: firstName,
          last_name: lastName,
        }),
      })
        .then((response) => response.json())
        .then(({ wasSuccessful, message }) => {
          wasSuccessful
            ? setState({ ...state, redirect: <Redirect to={"/"} /> })
            : alertUser("username", message);
        });
    }
  }

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {redirect}
      <Header>Almost There!</Header>
      <div className="inputs">
        <MyInput
          required
          error={usernameErrors}
          variant="outlined"
          name="username"
          label="Create Username"
          onChange={handleChange}
        />
        <Notification message={usernameErrors} />
        <MyInput
          required
          type="password"
          error={passwordErrors}
          variant="outlined"
          name="password"
          label="Create Password"
          onChange={handleChange}
        />
        <Notification message={passwordErrors} />
        <MyInput
          required
          type="password"
          error={confirmPasswordErrors}
          variant="outlined"
          name="confirmPassword"
          label="Confirm Password"
          onChange={handleChange}
        />
        <Notification message={confirmPasswordErrors} />
      </div>

      
      <SolidButton>Register</SolidButton>
    </form>
  );
}

export default RegisterPart2;
