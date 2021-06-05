import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import Typography from '@material-ui/core/Typography';
import { withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'
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
    username: "",
    password: "",
    confirm_password: "",
    position: "",
    first_name: "",
    last_name: "",
    error: null,
    redirect: null,
  };

  checkNames = () =>{
    const {users} = this.props
    const {first_name, last_name} = this.state
    if(users.find((user)=>user.first_name === first_name && user.last_name === last_name)){
      return 'success';
    }
  }

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
        <AnimatePresence className = {classes.whole_thing} exitBeforeEnter>
          <Route
          exact path= '/register'
          render = {()=>(
            <motion.div initial = 'out' animate='in' exit='out' variants = {pageVariant2} transition = {pageTransition}>

          <Typography variant = 'h6' className = {classes.register}>Create Your Account<Divider></Divider></Typography>
          <TextField className = {classes.input} name = 'first_name' label="First Name" onChange={this.handleChange}/>
          <TextField className = {classes.input} name = 'lasy_name' label="Last Name" onChange={this.handleChange}/>
          <Link className = {classes.submit_link} to = 'register/user'>
            <Button
              variant="outlined"
              color="primary"
              className={classes.submit}
              onClick={this.checkNames}
            >
              Next
            </Button> 
          </Link>

          {this.state.error && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {this.state.error}
            </Alert>
          )}

        </motion.div>
          )
          }
          />
      
        
          <Route 
            path = '/register/user'
            render = {()=>{
              return(
                <motion.div initial = 'out' animate='in' exit='out' variants = {pageVariant2} transition = {pageTransition}>
          <Typography variant = 'h6' className = {classes.register}>1 More Step!<Divider></Divider></Typography>

          <TextField className = {classes.input} name = 'username' label="Username" onChange={this.handleChange}/>
          <TextField className = {classes.input} name = 'password' label="Password"  type = 'password' onChange={this.handleChange}/>
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
        </motion.div>

              )
            }
            }
          />
          
        </AnimatePresence>
      )
    );
  }
}
export default withStyles(styles)(Register);