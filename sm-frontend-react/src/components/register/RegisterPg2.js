import React, { Component } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Divider, TextField, Button, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import StyledPaper from "../StyledPaper";

class RegisterPg2 extends Component {
  state = {
    username: {
      value: "",
      error: null,
    },
    password: {
      value: "",
      error: null,
    },
    confirmPassword: {
      value: "",
      error: null,
    },
  };

  handleBack = () => {
    this.setState({
      pgNum: 1,
      foundUser: null,
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: { value: e.target.value, error: null } });
  };

  confirmPasswordError = () => {
    this.setState({
      confirmPassword: {
        ...this.state.confirmPassword,
        error: (
          <Alert severity="error">
            <AlertTitle>Confirm Password Error</AlertTitle>
            Password and Confirm Password Must Be The Same!
          </Alert>
        ),
      },
    });
  };

  usernameError = () => {
    this.setState({
      username: {
        ...this.state.username,
        error: (
          <Alert severity="error">
            <AlertTitle>Username Error</AlertTitle>
            Username Alread In Use
          </Alert>
        ),
      },
    });
  };

  submitToServer = (username, password, firstName, lastName) => {
    const { postReq, notifyUser } = this.props;
    let rawResponse = postReq(
      `/register/${firstName.toLowerCase()}-${lastName.toLowerCase()}`,
      {
        username: username.value,
        password: password.value,
      }
    );
    rawResponse.then((data) =>
      data.json().then(({ response }) => {
        if (response === true) {
          this.setState({
            redirect: <Redirect to="/login" />,
          });
        } else {
          notifyUser({
            content: response,
            title: "error",
            severity: "error",
          });
        }
      })
    );
  };

  handleSubmit = () => {
    const { username, password, confirmPassword, firstName, lastName } =
      this.state;

    const { users } = this.props;
    if (password.value !== confirmPassword.value) {
      this.confirmPasswordError();
    } else if (users.find((user) => user.username === username.value)) {
      this.usernameError();
    } else {
      this.submitToServer(username, password, firstName, lastName);
    }
  };

  render() {
    const { classes, firstName, lastName } = this.props;
    return (
      <StyledPaper>
        <Typography variant="h6" className={classes.header}>
          Found You {firstName}{" "}
          {lastName}
        </Typography>

        <Typography variant="h6" className={classes.register}>
          1 More Step!
          <Divider></Divider>
        </Typography>
        <TextField
          className={classes.input}
          name="username"
          label="Username"
          onChange={this.handleChange}
          required
        />
        {this.state.username.error}
        <TextField
          className={classes.input}
          name="password"
          label="Password"
          type="password"
          onChange={this.handleChange}
          required
        />
        {this.state.password.error}
        <TextField
          className={classes.input}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          onChange={this.handleChange}
          required
        />
        {this.state.confirmPassword.errorF}
        <Button
          variant="outlined"
          color="primary"
          className={classes.backBtn}
          onClick={this.handleBack}
        >
          Back
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={classes.submit}
          type="submit"
          onClick={this.handleSubmit}
        >
          Register
        </Button>
      </StyledPaper>
    );
  }
}

export default RegisterPg2;
