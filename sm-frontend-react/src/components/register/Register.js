import React, { Component } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Redirect } from "react-router-dom";

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
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      this.state.redirect || (
        <form onSubmit={this.handleSubmit}>
          <label>
            <b>Username</b>
          </label>
          <input
            onChange={this.handleChange}
            type="text"
            placeholder="Enter Username"
            name="username"
            required
          />
          <label>
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
          {this.state.error && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {this.state.error}
            </Alert>
          )}
        </form>
      )
    );
  }
}
export default Register;
