import React, { useState } from "react";
import { Redirect } from "react-router-dom";

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

  function alertUser(error, message) {
    setState({
      ...state,
      [error]: message,
    });
    setTimeout(() => {
      setState({ ...state, [error]: null });
    }, 4000);
  }

  function handleSubmit() {
    let errors = [];
    users.find((user) => user.username === username) &&
      errors.push({
        error: "username",
        message: "This username is already in use.",
      });
    confirmPassword !== password &&
      errors.push({
        error: "confirmPassword",
        message: "Confirm password and password are not the same",
      });

    if (errors.length) {
      errors.map(({ error, message }) => alertUser(error, message));
    } else {
      fetch("/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, firstName, lastName }),
      })
        .then((response) => response.json())
        .then(({ wasSuccessful, message }) => {
          wasSuccessful
            ? setRedirect(<Redirect to={"/"} />)
            : alertUser("username", message);
        });
    }
  }

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }
  return (
    <form onSubmit={handleSubmit}>
      {redirect}
      <Header>Almost There!</Header>
      <MyInput
        required
        error={usernameErrors}
        variant="outlined"
        name="username"
        label="Create Username"
        onChange={handleChange}
      />
      <MyInput
        required
        error={passwordErrors}
        variant="outlined"
        name="password"
        label="Create Password"
        onChange={handleChange}
      />
      <MyInput
        required
        error={confirmPasswordErrors}
        variant="outlined"
        name="confirmPassword"
        label="Confirm Password"
        onChange={handleChange}
      />
      <SolidButton>Register</SolidButton>
    </form>
  );
}

export default RegisterPart2;
