import {Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import Typography from '@material-ui/core/Typography';
import { withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {AnimatePresence, motion} from 'framer-motion';

const pageVariant1 = {
  in:{
    opacity:1,
  },
  out:{
    opacity:0,
    x:'-100vw'
  }
}

const pageVariant2 = {
  in:{
    opacity:1,
    x:0,
  },
  out:{
    opacity:0,
    x:'-100vw'
  }
}

const pageTransition = {
  duration :.2,
  transition:'linear',
}

const styles = theme => ({
  register:{
    whole_thing:{
      overflowX:'hidden',
    },
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
  submit_link:{
    textDecoration: 'none',
  },
  backbtn:{
    width:'100px',
    'margin-left':'auto',
    color: '#00C5FF',
    'border-color':'#00C5FF',
  },
  backbtn_link:{
    textDecoration: 'none',
  },
  input:{
    margin: '10px',
  },

})

class Register extends Component {
  state = {
    username: {
      value: "",
      errors:null, 
    },
    password: {
      value: "",
      errors:null, 
    },
    confirm_password: {
      value: "",
      errors:null, 
    },
    first_name: {
      value: "",
      errors:null, 
    },
    last_name: {
      value: "",
      errors:null, 
    },
    error: null,
    redirect: null,
    found_user:null,
  };


  checkNames = () =>{
    const {users, notifyUser} = this.props
    let {first_name, last_name} = this.state
    first_name = first_name.value.toLowerCase();
    last_name = last_name.value.toLowerCase();
    const found_user = users.find((user)=>user.first_name === first_name && user.last_name === last_name)
    if(found_user){
      console.log('USER FOUND')
      this.setState({found_user:found_user, redirect: <Redirect to = '/register/user'/>});
    }
    else{
      notifyUser({
        content: "Sorry we couldn't find you in the database!",
        title: 'Error',
        severity:'error',
      })
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: {value : e.target.value ,error :null}});
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
    if (password.value !== confirm_password.value) {
      this.setState({
        error: "Confirm Password and Password must be the same",
      });
    } else if (users.find((user) => user.username.value === username)) {
      this.setState({
        error: "User already exists",
      });
    } else {
      let rawResponse = postReq("/register", 
        { 
          username: username.value,
          password: password.value,
          first_name: first_name.value,
          last_name: last_name.value,
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
        <AnimatePresence className = {classes.whole_thing} exitBeforeEnter>
          {/*<Message message={this.state.error} />*/}
          <Route
          exact path= '/register'
          render = {()=>(
            <motion.div initial = 'out' animate='in' exit='out' variants = {pageVariant2} transition = {pageTransition} className = 'register-form'>

                <Typography variant = 'h6' className = {classes.register}>Create Your Account<Divider></Divider></Typography>
                <TextField className = {classes.input} name = 'first_name' label="First Name" onChange={this.handleChange}/>
                {this.state.first_name.errors}
                <TextField className = {classes.input} name = 'last_name' label="Last Name" onChange={this.handleChange}/>
                {this.state.last_name.errors}
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.submit}
                  onClick={this.checkNames}
                >
                  Next
                </Button>
            </motion.div>
              )
            }
          />
          </AnimatePresence>
      
        <AnimatePresence>
          <Route 
            path = '/register/user'
            render = {()=>{
              if (this.state.found_user === null){
                return <Redirect to = '/register'/>
              }
              return(
                <motion.div initial = 'out' animate='in' exit='out' variants = {pageVariant2} transition = {pageTransition} className='register-form'>
                      <Typography variant = 'h6' className = {classes.register}>1 More Step!<Divider></Divider></Typography>
                      <TextField className = {classes.input} name = 'username' label="Username" onChange={this.handleChange}/>
                      {this.state.username.errors}
                      <TextField className = {classes.input} name = 'password' label="Password"  type = 'password' onChange={this.handleChange}/>
                      {this.state.password.errors}
                      <TextField className = {classes.input} name = 'confirm_password' label="Confirm Password"  type = 'password' onChange={this.handleChange}/>
                      {this.state.confirm_password.errors}
                      <Link className = {classes.submitLink} to = '/user'>
                      <Link className = {classes.backbtn_link} to = '/register'>
                        <Button
                          variant="outlined"
                          color="primary"
                          className= {classes.backbtn}
                        >
                          Back
                        </Button>
                      </Link>
                      <Button
                        type = 'submit'
                        variant="outlined"
                        color="primary"
                        className={classes.submit}
                      >
                        Register
                      </Button>
                      </Link>
                  </motion.div>)}}
            />
          </AnimatePresence>
          </React.Fragment>
      )
    );
  }
}
export default withStyles(styles)(Register);