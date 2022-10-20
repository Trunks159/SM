import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "../forms.css";
import {
  OutlinedButton,
  SolidButton,
  MyInput,
  Header,
} from "../StyledComponents";

//form styles are the same so just a classname
//inputs are styled by styled components
//They are spaced by margins
//Buttons are styled buttons

function RegisterPart1({ users, notifyUser }) {
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
      <Header>Link Your Account</Header>

      <MyInput
        required
        error={errors}
        variant="outlined"
        name="firstName"
        label="Enter First Name"
        onChange={handleChange}
      />
      <MyInput
        required
        error={errors}
        variant="outlined"
        name="lastName"
        label="Enter Last Name"
        onChange={handleChange}
      />
      <OutlinedButton variant="outlined" type="submit">
        Next
      </OutlinedButton>
    </form>
  );
}

function Register(props) {
  return (

      <RegisterPart1 {...props} />

  );
}

export default Register;
