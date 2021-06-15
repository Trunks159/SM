import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { AnimatePresence, motion } from "framer-motion";

const pageVariant1 = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
    x: "-100vw",
  },
};

const pageVariant2 = {
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "-100vw",
  },
};

const pageTransition = {
  duration: 0.2,
  transition: "linear",
};

const styles = (theme) => ({
  register: {
    whole_thing: {
      overflowX: "hidden",
    },
    "font-size": "40px",
    "font-weight": "500",
  },
  submit: {
    width: "100px",
    "margin-left": "auto",
    color: "#00C5FF",
    "border-color": "#00C5FF",
  },
  submit_link: {
    textDecoration: "none",
  },
  backbtn: {
    width: "100px",
    "margin-left": "auto",
    color: "#00C5FF",
    "border-color": "#00C5FF",
  },
  backbtn_link: {
    textDecoration: "none",
  },
  input: {
    margin: "10px",
  },
});

class AddUser extends Component {
  state = {
    first_name: {
      value: "",
      errors: null,
    },
    last_name: {
      value: "",
      errors: null,
    },
    password: {
      value: "",
      errors: null,
    },
    redirect: null,
  };

  capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

  checkNames = () => {
    const { users, notifyUser, postReq } = this.props;
    let { first_name, last_name, position } = this.state;
    first_name = first_name.value.toLowerCase();
    last_name = last_name.value.toLowerCase();
    const found_user = users.find(
      (user) => user.first_name === first_name && user.last_name === last_name
    );
    if (found_user) {
      notifyUser({
        content: "User Already In Database!",
        title: "Error",
        severity: "error",
      });
    } else {
      let rawResponse = postReq("/add_user", {
        first_name: first_name.value.toLowerCase(),
        last_name: last_name.value.toLowerCase(),
        position: position.value.toLowerCase(),
      });
      rawResponse.then((data) =>
        data.json().then(({ response }) => {
          if (response === true) {
            this.setState({
              redirect: <Redirect to="/" />,
            });
          } else {
            notifyUser({
              content: response,
              title: "Error",
              severity: "error",
            });
          }
        })
      );
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: { value: e.target.value, error: null } });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, confirm_password, first_name, last_name } =
      this.state;

    console.log("Current Username, Password: ", username, password);

    const { users, postReq, notifyUser } = this.props;
    if (password.value !== confirm_password.value) {
      this.setState({
        error: "Confirm Password and Password must be the same",
      });
    } else if (users.find((user) => user.username === username.value)) {
      this.setState({
        error: "User already exists",
      });
    } else {
      let rawResponse = postReq("/register", {
        username: username.value,
        password: password.value,
        first_name: first_name.value.toLowerCase(),
        last_name: last_name.value.toLowerCase(),
      });
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
    }
  };

  render() {
    const { classes } = this.props;
    if (this.state.redirect) {
      return this.state.redirect;
    }
  }
}
export default withStyles(styles)(AddUser);
