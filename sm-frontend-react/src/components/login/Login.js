import React, { Component } from "react";
import { Alert } from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Divider,
  Typography,
  Paper,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";

const styles = () => ({
  main: {
    margin : 100,
    background: "#F2F5F6",
    width: 700,
    display :'flex',
    flexDirection : 'column',
  },
  header: {
    margin: 30,
    fontSize: 40,
    fontWeight: "500",
  },
  submit: {
    backgroundColor: "#ff4bdb",
    width: 100,
    margin : 50,
    marginLeft: "auto",
  },
  input: {
    margin: 10,
    marginRight: 20,
    marginLeft : 20,
    marginBottom : 5,
  },
  forgot: {
    textDecoration: "none",
    margin: 'none',
    marginLeft: 20,
    fontSize: 12,
  },
  remember: {
    margin: 20,
  },
});

class Login extends Component {
  state = {
    username: "",
    password: "",
    remember: false,
    username_errors: null,
    password_errors: null,
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleCheckbox = (e) => {
    this.setState({
      remember: e.target.checked,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, remember } = this.state;
    const { users, postReq, notifyUser } = this.props;
    console.log("Da users: ", users);
    const user = users.find((user) => user.username === username);

    if (user) {
      let x = postReq("/user_login", {
        username: username,
        password: password,
        remember: remember,
      });
      x.then((data) =>
        data.json().then(({ current_user }) => {
          if (current_user.is_authenticated) {
            notifyUser({
              content: username + " is now logged in!",
              title: "Success",
              severity: "success",
            });
          } else {
            this.setState({
              password_errors: (
                <Alert variant="outlined" severity="error">
                  Bad Password
                </Alert>
              ),
            });
            setTimeout(() => {
              this.setState({ password_errors: null });
            }, 4000);
          }
        })
      );
    } else {
      this.setState({
        username_errors: (
          <Alert variant="outlined" severity="error">
            Bad Username
          </Alert>
        ),
      });
      setTimeout(() => {
        this.setState({ username_errors: null });
      }, 4000);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.main}>
        <Typography variant="h6" className={classes.header}>
          Login 
        </Typography>
        <Divider></Divider>
        <TextField
          className={classes.input}
          name="username"
          label="Enter Username"
          onChange={this.handleChange}
        />
        {this.state.username_errors ? this.state.username_errors : null}
        <TextField
          className={classes.input}
          name="password"
          label="Enter Password"
          onChange={this.handleChange}
          type="password"
        />
        {this.state.password_errors}
        <Typography variant="subtitle1">
          <Link className={classes.forgot} to="/">
            Forgot Password
          </Link>
        </Typography>
        <FormControlLabel
          className={classes.remember}
          control={
            <Checkbox
              checked={this.state.remember}
              onChange={this.handleCheckbox}
              name="remember"
              primary
            />
          }
          label="Remember Me"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          endIcon={<LockIcon />}
          onClick={this.handleSubmit}
        >
          Login
        </Button>
      </Paper>
    );
  }
}
export default withStyles(styles)(Login);
