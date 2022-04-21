import React, { Component } from "react";
import { Divider, TextField, Button, Typography } from "@material-ui/core";
import StyledPaper from "../StyledPaper";
import { Redirect } from "react-router-dom";

class RegisterPg1 extends Component {
  state = {
    firstName: {
      value: "",
      error: null,
    },
    lastName: {
      value: "",
      error: null,
    },
    redirect: null,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: { value: e.target.value, error: null } });
  };

  checkNames = () => {
    const { users, notifyUser } = this.props;
    let { firstName, lastName } = this.state;
    firstName = firstName.value.toLowerCase();
    lastName = lastName.value.toLowerCase();
    const foundUser = users.find(
      (user) => user.firstName === firstName && user.lastName === lastName
    );

    if (foundUser) {
      if (foundUser.username) {
        notifyUser({
          content: "This User Is Alread Registered!",
          title: "Error",
          severity: "error",
        });
      } else {
        this.setState({
          redirect: <Redirect to={`/register/${firstName}/${lastName}`} />,
        });
      }
    } else {
      notifyUser({
        content: "Sorry we couldn't find you in the database!",
        title: "Error",
        severity: "error",
      });
    }
  };
  render() {
    const { classes } = this.props;
    return (
      this.state.redirect || (
        <StyledPaper>
          <Typography variant="h6" className={classes.header}>
            Link Your Account
          </Typography>
          <Divider></Divider>
          <TextField
            required
            className={classes.input}
            name="firstName"
            label="First Name"
            onChange={this.handleChange}
          />
          {this.state.firstName.error}
          <TextField
            required
            className={classes.input}
            name="lastName"
            label="Last Name"
            onChange={this.handleChange}
          />
          {this.state.lastName.error}
          <Button
            variant="outlined"
            color="primary"
            className={classes.submit}
            onClick={this.checkNames}
          >
            Next
          </Button>
        </StyledPaper>
      )
    );
  }
}

export default RegisterPg1;
