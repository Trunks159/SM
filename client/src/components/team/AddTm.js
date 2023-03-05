import React, { useState } from "react";
import Notification from "../forms/register/Notification";
import {
  Button,
  TextField,
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import styled from "@emotion/styled";
import { Redirect } from "react-router-dom";

const StyledButton = styled(Button)({
  background: "#0792B6",
  color: "white",
  fontWeight: "bold",
  textTransform: "none",
});

function AddTm({ teamMembers, notifyUser }) {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    errors: null,
    redirect: null,
    position: "team member",
  });

  const { firstName, lastName, errors, redirect, position } = state;

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
    e.preventDefault();
    //as long as there isn't someone with the same name you're good
    if (
      teamMembers.find(
        (tm) =>
          tm.firstName.toLowerCase() === firstName.toLowerCase() &&
          tm.lastName.toLowerCase() === lastName.toLowerCase()
      )
    ) {
      alertUser(
        <Alert severity="error">
          This team member is actually already in our system
        </Alert>
      );
    } else {
      fetch("/api/add_team_member", {
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
            setState({ ...state, redirect: <Redirect to={"/team"} /> });
            notifyUser({
              content: `${firstName} ${lastName} has been successfully added!`,
              title: "Addition Successful",
              severity: "success",
            });
          }
        });
    }
  }

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      {redirect}
      <h1>Add Team Member</h1>
      <Notification message={errors} />
      <p>
        Simply add a first and last name so the team member can make an account
        later
      </p>
      <TextField
        required
        error={errors}
        name="firstName"
        label="Enter First Name"
        onChange={handleChange}
        value={firstName}
      />
      <TextField
        required
        error={errors}
        name="firstName"
        label="Enter Last Name"
        onChange={handleChange}
        value={lastName}
      />
      <div style={{ margin: "15px 0px" }}>
        <FormControl fullWidth required>
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
      <StyledButton type="submit">Add Em'</StyledButton>
    </form>
  );
}

export default AddTm;
