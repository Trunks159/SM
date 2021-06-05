import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import Typography from '@material-ui/core/Typography';
import { withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';



const styles = theme => ({
  register:{
    margin: '40px',
    'font-size': '40px',
    'font-weight': '500',
  },
  submit:{
    width:'100px',
    'margin-left':'auto',
    color: '#00C5FF',
    'border-color':'#00C5FF',
  },
  input:{
    margin: '10px',
  },

})

class Register extends Component {
  state = {
    username: "",
    password: "",
    confirm_password: "",
    position: "",
    first_name: "",
    last_name: "",
    error: null,
    redirect: null,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      username,
      password,
      confirm_password,
      first_name,
      last_name,
    } = this.state;
    const {users, postReq} = this.props;
    if (password !== confirm_password) {
      this.setState({
        error: "Confirm Password and Password must be the same",
      });
    } else if (users.find((user) => user.username === username)) {
      this.setState({
        error: "User already exists",
      });
    } else {
      let rawResponse = postReq("/register", 
        { 
          username: username,
          password: password,
          first_name: first_name,
          last_name: last_name,
        });
      rawResponse.then((data)=>data.json().then(({response})=>{
        if (response === true){
          this.setState({
            redirect: <Redirect to="/login" />,
          });
        }else{
        this.setState({error:response});
      }}))
      /*{
      if (content.error) {
        this.setState({ error: content.error });
      } else if (content.success) {
        
      }*/
    }
  };

  render() {
    const {classes} = this.props
    return (
      this.state.redirect || (
        
        <React.Fragment>

          <Typography variant = 'h6' className = {classes.register}>Create Your Account<Divider></Divider></Typography>
        <form className = 'register-form' onSubmit={this.handleSubmit}>
          
        <TextField className = {classes.input} name = 'first_name' label="First Name" onChange={this.handleChange}/>
        <TextField className = {classes.input} name = 'lasy_name' label="Last Name" onChange={this.handleChange}/>
        <Button
        type = 'submit'
        variant="outlined"
        color="primary"
        className={classes.submit}
      >
        Next
      </Button> 
         {/* <label>
            <b>Password</b>
          </label>
          <input
            onChange={this.handleChange}
            type="password"
            placeholder="Enter Password"
            name="password"
            required
          />
          <label>
            <b>Confirm Password</b>
          </label>
          <input
            onChange={this.handleChange}
            type="password"
            placeholder="Confirm Password"
            name="confirm_password"
            required
          />
          <label>
            <b>First Name</b>
          </label>
          <input
            onChange={this.handleChange}
            type="text"
            placeholder="Enter First Name"
            name="first_name"
            required
          />
          <label>
            <b>Last Name</b>
          </label>
          <input
            onChange={this.handleChange}
            type="text"
            placeholder="Enter Last Name"
            name="last_name"
            required
          />
          <button type="submit">Register</button>
         */}

          {this.state.error && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {this.state.error}
            </Alert>
          )}
        </form>
        </React.Fragment>
      )
    );
  }
}
export default withStyles(styles)(Register);