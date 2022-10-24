import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Collapse, Alert } from "@mui/material";
import { OutlinedButton, MyInput, Header } from "../StyledComponents";

function RegisterPart1({ users, notifyUser }) {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    errors: null,
    redirect: null,
  });
  const { firstName, lastName, errors, redirect } = state;

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value.toLowerCase() });
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

  function handleSubmit(e) {
    //search through all users
    //if you find the user, see if they have a username
    // if so notify user that they are already in the system
    //if no username then redirect i guess to 'register/bob-marley'
    //This will go to form 2 basically
    e.preventDefault();
    const user = users.find(
      (user) => firstName === user.firstName && lastName === user.lastName
    );
    console.log("Dug users : , ", firstName);
    if (user) {
      if (user.username) {
        alertUser(
          <Alert severity="error">
            It seems you've already been registered
          </Alert>
        );
      } else {
        return setState({
          ...state,
          redirect: <Redirect to={`/register/${firstName}/${lastName}`} />,
        });
      }
    } else {
      alertUser(
        <Alert severity="error">
          Sorry your manager(s) haven't added you to our system yet
        </Alert>
      );
    }
  }
  return (
    redirect || (
      <form onSubmit={handleSubmit}>
        <Header>Link Your Account</Header>
        <Collapse in={errors}>{errors}</Collapse>

        <MyInput
          required
          error={errors}
          variant="outlined"
          name="firstName"
          label="Enter First Name"
          onChange={handleChange}
          value={"lastName"}
        />
        <MyInput
          required
          error={errors}
          variant="outlined"
          name="lastName"
          label="Enter Last Name"
          onChange={handleChange}
          value={lastName}
        />
        <OutlinedButton style={{ marginLeft: "auto", marginTop: 90 }}>
          Next
        </OutlinedButton>
      </form>
    )
  );
}

export default RegisterPart1;
