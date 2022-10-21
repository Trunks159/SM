import React, { useState } from "react";

import {
  OutlinedButton,
  SolidButton,
  MyInput,
  Header,
} from "../StyledComponents";

function RegisterPart2() {
  const [state, setState] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    usernameErrors: null,
    passwordErrors: null,
    confirmPasswordErrors: null,
  });

  const {
    userName,
    password,
    confirmPassword,
    usernameErrors,
    passwordErrors,
    confirmPasswordErrors,
  } = state;

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }
  return (
    <form>
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
