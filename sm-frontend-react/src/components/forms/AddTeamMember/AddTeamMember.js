import React, { useState } from "react";
import { Header, MyInput, SolidButton } from "../StyledComponents";
import Notification from "../register/Notification";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Redirect } from "react-router-dom";

function AddTeamMember({ teamMembers, notifyUser }) {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    position: "",
    redirect: null,
    errors: null,
  });

  const { firstName, lastName, position, errors, redirect } = state;

  function handleChange(e) {
    console.log("Name: ", e.target);
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function alertUser(message) {
    setState({
      ...state,
      errors: <Alert severity="error">{message}</Alert>,
    });
    setTimeout(() => {
      setState({ ...state, errors: null });
    }, 4000);
  }

  function handleSubmit(e) {
    e.preventDefault();
    //as long as there isn't someone with the same name you're good
    if (
      teamMembers.find(
        (tm) =>
          tm.firstName.toLowerCase() === firstName.toLowerCase() &&
          tm.lastName.toLowerCase() === lastName.toLowerCase()
      )
    ) {
      alertUser("This team member is actually already in our system");
    } else {
      fetch("/add_team_member", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          position,
        }),
      })
        .then((response) => response.json())
        .then(({ wasSuccessful, message }) => {
          if (wasSuccessful) {
            window.location.reload();
            notifyUser({
              content: `${firstName} ${lastName} has been successfully added!`,
              title: "Addition Successful",
              severity: "success",
            });
          }
        });
    }
  }

  return (
    <form className="authentification-form" onSubmit={handleSubmit}>
      {redirect}
      <Header>Add Team Member</Header>
      <Notification message={errors} />
      <p>
        Simply add a first and last name so the team member can make a username
        themselves later.
      </p>
      <MyInput
        error={errors}
        required
        variant="outlined"
        name="firstName"
        label="Enter First Name"
        onChange={handleChange}
        value={firstName}
      />
      <MyInput
        error={errors}
        required
        variant="outlined"
        name="lastName"
        label="Enter Last Name"
        onChange={handleChange}
        value={lastName}
      />
      <div style={{ margin: "15px 0px" }}>
        <FormControl fullWidth>
          <InputLabel>Position</InputLabel>
          <Select
            value={position}
            label="Position"
            onChange={handleChange}
            name="position"
          >
            <MenuItem value={0}>Team Member</MenuItem>
            <MenuItem value={1}>Team Leader</MenuItem>
          </Select>
        </FormControl>
      </div>
      <SolidButton>Add Em'</SolidButton>
    </form>
  );
}

export default AddTeamMember;
