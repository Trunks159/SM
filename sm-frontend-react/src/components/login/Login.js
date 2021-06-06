import React, { Component } from "react";
import { Alert } from "@material-ui/lab";
import Typography from '@material-ui/core/Typography';
import { withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';

const styles = theme => ({
  login : {
    margin: '40px',
    'font-size': '40px',
    'font-weight': '500',
  },
  submit:{
    'background-color': '#ff4bdb',
    width:'100px',
    'margin-left':'auto',
  },
  input:{
    margin: '10px',
  },
  link:{
    'text-decoration': 'none',
    'margin-left': '15px',
    'font-size': 'small',
  },
  remember:{
    margin: '20px',
  }
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
      console.log("Something");
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
    const {classes} = this.props
    return (
      <React.Fragment>
        <Typography variant = 'h6' className = {classes.login}>Login <Divider></Divider></Typography>
        
      <form className = 'login-form' onSubmit={this.handleSubmit}>
        <TextField className = {classes.input} name = 'username' label="Enter Username" onChange={this.handleChange} />
        {this.state.username_errors ? this.state.username_errors : null}
        <TextField className = {classes.input} name = 'password' label="Enter Password" onChange={this.handleChange}/>
        <Typography variant = 'subtitle1'><Link className = {classes.link} to = '/'>Forgot Password</Link></Typography>
        <FormControlLabel
        className = {classes.remember}
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
        {this.state.password_errors}

<Button
        type = 'submit'
        variant="contained"
        color="primary"
        className={classes.submit}
        endIcon={<LockIcon/>}
      >
        Login
      </Button>
      </form>
      </React.Fragment>

    );
  }
}
export default withStyles(styles)(Login);
