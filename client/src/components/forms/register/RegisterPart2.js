import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Alert } from "@mui/material";
import Notification from "./Notification";
import { SolidButton, MyInput, Header } from "../StyledComponents";
import { useDispatch } from "react-redux";

function userRegistered(user) {
  return { type: "USER_REGISTERED", payLoad: user };
}

function RegisterPart2({ user, users }) {
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
  const dispatch = useDispatch();

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
    users.find((user) => user.username === username.trim()) &&
      errors.push({
        error: "usernameErrors",
        message: "This username is already in use.",
      });

    if (username.trim().length < 5) {
      errors.push({
        error: "usernameErrors",
        message: "Username must be at least 5 characters long",
      });
    }

    confirmPassword !== password &&
      errors.push({
        error: "confirmPasswordErrors",
        message: "Confirm password and password are not the same",
      });

    if (errors.length) {
      return alertUser(errors);
    }
    fetch("/api/register", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.trim(),
        password: password.trim(),
        first_name: user.firstName.trim(),
        last_name: user.lastName.trim(),
      }),
    }).then((response) =>
      response.json().then((data) => {
        if (response.ok) {
          setState({ ...state, redirect: <Redirect to={"/"} /> });
          return dispatch(userRegistered(data));
        }
        throw new Error(data);
      })
    );
  }

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  return (
    <form className="authentification-form" onSubmit={handleSubmit}>
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

      <SolidButton type="submit">Register</SolidButton>
    </form>
  );
}

export default RegisterPart2;
