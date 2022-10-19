import React, { useState } from "react";
import { TextField, Checkbox, FormControlLabel } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import "../forms.css";
import FancyDivider from "../FancyDivider";
import { useStyles, StyledButton } from "../StyledComponents";

function RegisterPart1({ users, notifyUser, classes }) {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    errors: null,
  });
  const { firstName, lastName, errors } = state;

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
    if (user) {
      if (user.username) {
        alertUser("It seems you've already been registered");
      } else {
        return <Redirect to={`/register/${firstName}/${lastName}`} />;
      }
    } else {
      alertUser("Sorry your manager(s) haven't added you to our system yet");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <header>
        <h1>Link Your Account</h1>
        <FancyDivider />
      </header>

      <TextField
        required
        error={errors}
        variant="outlined"
        className={classes.input}
        name="firstName"
        label="Enter First Name"
        onChange={handleChange}
      />
      <TextField
        required
        error={errors}
        variant="outlined"
        className={classes.input}
        name="lastName"
        label="Enter Last Name"
        onChange={handleChange}
      />
      <StyledButton
        className={classes.register}
        variant="outlined"
        type="submit"
      >
        Next
      </StyledButton>
    </form>
  );
}

function Register({ users, notifyUser }) {
  const classes = useStyles();

  return <div></div>;
}

export default Register;
