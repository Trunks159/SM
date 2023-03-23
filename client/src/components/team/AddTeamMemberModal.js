import {
  Modal,
  TextField,
  Paper,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Alert,
  Button,
  Collapse,
} from "@mui/material";
import React, { useState } from "react";
import { StyledListButton, StyledSubmitButton } from "./StyledComponents";
import Notification from "../Notification";
import addIcon from "./assets/Add Person Icon.svg";
import { Redirect } from "react-router-dom";
import closeIcon from "./assets/Close Icon.svg";
import { useDispatch } from "react-redux";

function updateAlert(newAlert) {
  return {
    type: "UPDATE_ALERT",
    payLoad: newAlert,
  };
}

function newUser(newUser) {
  return {
    type: "NEW_USER",
    payLoad: newUser,
  };
}

function AddTeamMemberModal({ children, addTeamMember, teamMembers }) {
  const [state, setState] = useState({
    open: false,
    firstName: "",
    lastName: "",
    errors: null,
    redirect: null,
    position: "team member",
  });
  const { firstName, lastName, errors, redirect, position, open } = state;
  const dispatch = useDispatch();
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
          tm.firstName === firstName.toLowerCase().trim() &&
          tm.lastName === lastName.toLowerCase().trim()
      )
    ) {
      alertUser({
        content: "This team member is actually already in our system",
        severity: "error",
      });
    } else {
      const response = fetch("/api/users", {
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
      }).then((response) =>
        response.json().then((data) => {
          if (response.ok) {
            setState({ ...state, redirect: <Redirect to={"/team"} /> });
            dispatch(newUser(data));
          } else {
            dispatch(
              updateAlert({
                content: data,
                title: "Addition Unsuccessful",
                severity: "error",
              })
            );
          }
        })
      );
    }
  }

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function closeModal() {
    setState({ ...state, open: false });
  }
  return (
    <div style={{ marginLeft: "auto" }}>
      <StyledListButton
        startIcon={<img src={addIcon} />}
        onClick={() => setState({ ...state, open: true })}
      >
        <span className="button-text"></span>
      </StyledListButton>
      <Modal
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClose={() => setState({ ...state, open: false })}
        open={open}
      >
        <Paper style={{ maxWidth: "90%", height: 600, margin: 30 }}>
          <form className="add-tm-form" onSubmit={handleSubmit}>
            {redirect}
            <h1>Add Team Member</h1>
            <Button
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                margin: 15,
                opacity: 0.8,
              }}
              onClick={closeModal}
            >
              <img src={closeIcon} />
            </Button>
            <Collapse in={errors}>
              <Alert severity={"error"}>{errors && errors.content}</Alert>
            </Collapse>

            <p>
              Simply add a first and last name so the team member can make an
              account later
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
              name="lastName"
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
                  <MenuItem value={"team member"}>Team Member</MenuItem>
                  <MenuItem value={"team leader"}>Team Leader</MenuItem>
                </Select>
              </FormControl>
            </div>
            <StyledSubmitButton size="large" variant="contained" type="submit">
              Add Em'
            </StyledSubmitButton>
          </form>
        </Paper>
      </Modal>
    </div>
  );
}

export default AddTeamMemberModal;
