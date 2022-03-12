import { Redirect } from "react-router-dom";
import React, { Component } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { AnimatePresence, motion } from "framer-motion";

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

class Register extends Component {
  state = {
    pg_num: 1,
    username: {
      value: "",
      errors: null,
    },
    password: {
      value: "",
      errors: null,
    },
    confirm_password: {
      value: "",
      errors: null,
    },
    first_name: {
      value: "",
      errors: null,
    },
    last_name: {
      value: "",
      errors: null,
    },
    redirect: null,
    found_user: null,
  };

  capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

  checkNames = (e) => {
    e.preventDefault();
    const { users, notifyUser } = this.props;
    let { first_name, last_name } = this.state;
    first_name = first_name.value.toLowerCase();
    last_name = last_name.value.toLowerCase();
    const found_user = users.find(
      (user) => user.first_name === first_name && user.last_name === last_name
    );

    if (found_user) {
      if (found_user.username) {
        notifyUser({
          content: "This User Is Alread Registered!",
          title: "Error",
          severity: "error",
        });
      } else {
        this.setState({
          found_user: found_user,
          pg_num: 2,
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

  handleChange = (e) => {
    this.setState({ [e.target.name]: { value: e.target.value, error: null } });
  };

  handleBack = () => {
    this.setState({
      pg_num: 1,
      found_user: null,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, confirm_password, first_name, last_name } =
      this.state;

    const { users, postReq, notifyUser } = this.props;
    if (password.value !== confirm_password.value) {
      this.setState({
        confirm_password: {
          value: confirm_password.value,
          errors: (
            <Alert severity="error">
              <AlertTitle>Confirm Password Error</AlertTitle>
              Password and Confirm Password Must Be The Same!
            </Alert>
          ),
        },
      });
    } else if (users.find((user) => user.username === username.value)) {
      this.setState({
        username: {
          value: username.value,
          errors: (
            <Alert severity="error">
              <AlertTitle>Username Error</AlertTitle>
              Username Alread In Use
            </Alert>
          ),
        },
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
    if (this.state.pg_num === 1) {
      return (
        <AnimatePresence className={classes.whole_thing} exitBeforeEnter>
          <motion.div
            initial="out"
            animate="in"
            exit="out"
            variants={pageVariant2}
            transition={pageTransition}
          >
            <form className="register-form" onSubmit={this.checkNames}>
              <Typography variant="h6" className={classes.register}>
                Link Your Account<Divider></Divider>
              </Typography>
              <TextField
                required
                className={classes.input}
                name="first_name"
                label="First Name"
                onChange={this.handleChange}
              />
              {this.state.first_name.errors}
              <TextField
                required
                className={classes.input}
                name="last_name"
                label="Last Name"
                onChange={this.handleChange}
              />
              {this.state.last_name.errors}
              <Button
                variant="outlined"
                color="primary"
                className={classes.submit}
                type="submit"
              >
                Next
              </Button>
            </form>
          </motion.div>
        </AnimatePresence>
      );
    } else if (this.state.found_user === null) {
      return <Redirect to="/register" />;
    } else {
      return (
        <motion.div
          initial="out"
          animate="in"
          exit="out"
          variants={pageVariant2}
          transition={pageTransition}
        >
          <form className="register-form" onSubmit={this.handleSubmit}>
            <Typography variant="h6" className={classes.register}>
              Found You {this.capitalize(this.state.found_user.first_name)}{" "}
              {this.capitalize(this.state.found_user.last_name)}
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
            />
            {this.state.username.errors}
            <TextField
              className={classes.input}
              name="password"
              label="Password"
              type="password"
              onChange={this.handleChange}
            />
            {this.state.password.errors}
            <TextField
              className={classes.input}
              name="confirm_password"
              label="Confirm Password"
              type="password"
              onChange={this.handleChange}
            />
            {this.state.confirm_password.errors}
            <Link className={classes.backbtn_link} to="/register">
              <Button
                variant="outlined"
                color="primary"
                className={classes.backbtn}
                onClick={this.handleBack}
              >
                Back
              </Button>
            </Link>
            <Button
              variant="outlined"
              color="primary"
              className={classes.submit}
              type="submit"
            >
              Register
            </Button>
          </form>
        </motion.div>
      );
    }
  }
}
export default withStyles(styles)(Register);
