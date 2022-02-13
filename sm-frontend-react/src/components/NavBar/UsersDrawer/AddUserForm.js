import React, {Component} from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Divider, TextField, Select, MenuItem, Button, withStyles } from "@material-ui/core";


const styles = ()=>({
  form: {
    color: "white",
    margin: "20px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    height: "60%",
    boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 0.25)",
  },
  header: {
    margin: "10px",
  },
  textfield :{
    color: 'white',
  },
  select: {
    display: "flex",
    flexDirection: "column",
  },
  submitBtn: {
    textTransform: "none",
    color: "white",
    backgroundColor: "#E258C7",
    borderRadius: 3,
    margin: "20px",
    "&:hover": {
      backgroundColor: "#FF42DA",
    },
  },

});

class AddUserForm extends Component {
    state = { 
      firstName : '',
      lastName :'',
      position : '',
     } 

    userExists = (firstName, lastName, users) =>{
        return (users.find(
            (user) =>
              user.firstName.toLowerCase() === firstName.toLowerCase() &&
              user.lastName.toLowerCase() === lastName.toLowerCase()
          ));
    }

    displayErrorMessage = ({message, title})=>{
        const error = (
            <Alert severity="error">
              <AlertTitle>{title}</AlertTitle>
              {message}
            </Alert>
          );
          this.setState({
            errors: error,
          });
          setTimeout(() => {
            this.setState({ errors: null });
          }, 4000);
    }

    createUser = (firstName, lastName, position ) =>{
        /*Commits user to the database and displays message*/
        const { postReq , notifyUser} = this.props;
        let rawResponse = postReq("/add_user", {
          first_name: firstName.toLowerCase(),
          last_name: lastName.toLowerCase(),
          position: position.toLowerCase(),
        });
          rawResponse.then((data) =>
            data.json().then((response) => {
              const severity = response.success ? "success" : "error";
              const title = severity.charAt(0) + severity.slice(1);
              notifyUser({
                content: response.message
                  ? response.message
                  : "User successfully added!",
                title: title,
                severity: severity,
              });
            })
          );
    }

    handlesubmitUser = (e) => {
        e.preventDefault();
        const { firstName, lastName, position } = this.state;
        const {users} = this.props;

        if (this.userExists(firstName, lastName, users)) {
          this.displayErrorMessage({title : 'Name Error', message : 'User With That Name Already Exists'})
        } else {
            this.createUser(firstName, lastName, position);
        }
      };

      
    render() { 
        const {classes} = this.props;
        return (
          <form className={classes.form} onSubmit={this.handlesubmitUser}>
            <p className={classes.header}>Add User</p>
          <Divider></Divider>
            <TextField
              required
              className={classes.textfield}
              name="firstName"
              label="Enter First Name"
              onChange={this.handleChange}
              variant="outlined"
              InputProps={{ className: classes.textfieldInput }}
              InputLabelProps={{ className: classes.textfieldInput }}
            />
            <TextField
              required
              className={classes.textfieldln}
              name="lastName"
              label="Enter Last Name"
              onChange={this.handleChange}
              variant="outlined"
              InputProps={{ className: classes.textfieldInput }}
              InputLabelProps={{ className: classes.textfieldInput }}
            />
          <div className={classes.select}>
            <p className={classes.input}>Position</p>
            <Select
              name="position"
              defaultValue={this.state.position}
              onChange={this.handleChange}
              inputProps={{ className: classes.textfield }}
            >
              <MenuItem value="crew">Crew</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
            </Select>
          </div>

          <Button type="submit" className={classes.submitBtn}>
            Submit User
          </Button>
        </form>
        );
    }
}
 
export default withStyles(styles)(AddUserForm);