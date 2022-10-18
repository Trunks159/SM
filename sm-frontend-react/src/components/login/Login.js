import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Paper,
  Button,
  styled,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import "./login.css";
import FancyDivider from "./FancyDivider";

const StyledButton = styled(Button)({
  borderRadius: 4,
  transitionDuration: ".2s",
  opacity: 1,
  width: 145,
  height: 45,
  "& .MuiButton-label": {
    textTransform: "none",
    fontWeight: 700,
    fontSize: 20,
    color: "white",
  },
});

const styles = () => ({
  divider: {
    backgroundColor: "blue",
    height: 0.5,
    margin: "15px 0px",
  },
  input: {
    maxWidth: 260,
    margin: "0px 0px",
    "& .MuiFormHelperText-root": {
      position: "absolute",
      bottom: -20,
    },
  },
  rememberMe: {
    margin: "7px 0px",

    width: "max-content",
    "& .MuiTypography-root": {
      fontSize: 12,
    },
  },
  submit: {
    background: "rgba(7, 145, 182, 1)",
    margin: "20px 0px 20px auto",
    "&:hover": {
      opacity: 0.8,
      background: "rgba(0, 203, 255, 1)",
    },
  },
  register: {
    textTransform: "none",
    borderColor: "rgba(7, 145, 182, 1)",
    borderWidth: 1.5,
    "& .MuiButton-label": {
      fontWeight: "normal",
      color: "rgba(7, 145, 182, 1)",
    },
  },
});

class Login extends Component {
  state = {
    username: "",
    password: "",
    remember: false,
    usernameErrors: null,
    passwordErrors: null,
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
    const { users, postReq } = this.props;
    const user = users.find((user) => user.username === username);

    if (user) {
      let x = postReq("/user_login", {
        username: username,
        password: password,
        remember: remember,
      });
      x.then((data) =>
        data.json().then((current_user) => {
          if (current_user.isAuthenticated) {
            this.handleSuccessfulLogin();
          } else {
            this.handleBadPassword();
          }
        })
      );
    } else {
      this.handleBadUsername();
    }
  };

  handleSuccessfulLogin = () => {
    this.props.notifyUser({
      content: this.state.username + " is now logged in!",
      title: "Login Successful",
      severity: "success",
    });
  };

  handleBadPassword = () => {
    this.setState({
      passwordErrors: "Incorrect password",
    });
    setTimeout(() => {
      this.setState({ passwordErrors: null });
    }, 4000);
  };

  handleBadUsername = () => {
    this.setState({
      usernameErrors: "This username wasn't found in our database",
    });
    setTimeout(() => {
      this.setState({ usernameErrors: null });
    }, 4000);
  };

  render() {
    const { classes } = this.props;
    const { usernameErrors, passwordErrors } = this.state;
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <header>
          <h1>Sign In</h1>
          <FancyDivider />
        </header>
        <TextField
          required
          error={usernameErrors}
          variant="outlined"
          className={classes.input}
          name="username"
          label="Enter Username"
          onChange={this.handleChange}
          helperText={usernameErrors}
        />
        <TextField
          style={{ marginTop: 25 }}
          error={passwordErrors}
          required
          variant="outlined"
          className={classes.input + " password"}
          name="password"
          label="Enter Password"
          onChange={this.handleChange}
          type="password"
          helperText={passwordErrors}
        />
        <Link className="forgot-password" to="/">
          Forgot Password?
        </Link>
        <FormControlLabel
          className={classes.rememberMe}
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
        <StyledButton
          className={classes.submit}
          type="submit"
          endIcon={<LockIcon />}
        >
          Sign In
        </StyledButton>
        <p style={{ fontWeight: 300, fontSize: 13, marginTop: 40 }}>
          Haven't made an account yet?
        </p>
        <Link style={{ textDecoration: "none" }} to="/register">
          <StyledButton className={classes.register} variant="outlined">
            Register
          </StyledButton>
        </Link>
      </form>
    );
  }
}
export default withStyles(styles)(Login);
