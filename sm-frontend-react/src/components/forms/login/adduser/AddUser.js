import { Collapse } from "@material-ui/core";
import React, { useState } from "react";
import { Header, MyInput, SolidButton } from "../../StyledComponents";

function AddTeamMember() {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    error: null,
  });

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function alertUser(message) {
    setState({
      ...state,
      errors: message,
    });
    setTimeout(() => {
      setState({ ...state, errors: null });
    }, 4000);
  }
  return (
    <form className="login-form">
      <Header>Add Team Member</Header>
      <Collapse in={error}>{error}</Collapse>
      <MyInput
        error={error}
        required
        variant="outlined"
        name="firstName"
        label="Enter First Name"
        onChange={handleChange}
        value={firstName}
      />
      <MyInput
        error={error}
        required
        variant="outlined"
        name="lastName"
        label="Enter Last Name"
        onChange={handleChange}
        value={lastName}
      />
      <SolidButton>Register</SolidButton>
    </form>
  );
}

export default AddTeamMember;
