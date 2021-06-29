import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Drawer, Divider, IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import DehazeIcon from "@material-ui/icons/Dehaze";
import Typography from "@material-ui/core/Typography";
import ReorderIcon from "@material-ui/icons/Reorder";
import { red } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const styles = () => ({
  list: {
    width: 250,
    margin: 0,
    background: "#7e266c",
  },
  fullList: {
    width: "auto",
  },
  divider: {
    background: "white",
  },
  user_button: {
    width: "100%",
    backgroundColor: "#BE35A3",
    textTransform: "none",
    color: "white",
    "&:hover": {
      background: "#FF4BDB",
    },
  },

  user_link: {
    textDecoration: "none",
    color: "white",
  },
  users_header: {
    color: "white",
    margin: "10px",
  },
  add_user_btn: {
    padding: "5px",
    marginLeft: "auto",
    textTransform: "none",
    color: "white",
    background: "#FF4BDB",
    ":&hover": {
      background: "#FF9CEB",
    },
    textDecoration: "none",
  },
  users: {
    "margin-left": "10px",
    color: "white",
  },
  paper: {
    background: "#7e266c",
    width: "250px",
  },
  first_name:{
    color:'white',
  },
});

class UsersDrawer2 extends Component {
  state = {
    isDrawerOpened: false,
    add_user: false,
    first_name:'',
    last_name:'',
    position:'crew',
  };

  toggleDrawerStatus = () => {
    this.setState({
      isDrawerOpened: true,
    });
  };

  closeDrawer = () => {
    this.setState({
      isDrawerOpened: false,
      add_user:false, 
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAddUser = (classes) => {
    if(this.state.add_user === false){
      this.setState({add_user : <div className = 'add_user_form'>
        <Typography variant = 'h6'>
          Add User
        </Typography>
        <TextField
            className='add_user_first_name'
            name="first_name"
            label="Enter First Name"
            onChange={this.handleChange}
          />
          <TextField
            className='add_user_last_name'
            name="last_name"
            label="Enter Last Name"
            onChange={this.handleChange}
          />
          <FormControl>
          <InputLabel id="demo-simple-select-label">Position</InputLabel>
          <Select
          id="demo-simple-select"
          value={this.state.position}
          onChange={this.handleChange}
        >
          <MenuItem value={'crew'}>Crew</MenuItem>
          <MenuItem value={'manager'}>Manager</MenuItem>

        </Select>
          </FormControl>
           
      </div>});
    }
    else{
      this.setState({add_user : false});
    }
  }


  render() {
    const { isDrawerOpened } = this.state;
    const { users, classes } = this.props;
    return (
      <div>
        <div>
          <IconButton onClick={this.toggleDrawerStatus}>
            {!isDrawerOpened ? <ReorderIcon style={{ fill: "white" }} /> : null}
          </IconButton>
        </div>
        <Drawer
          variant="temporary"
          open={isDrawerOpened}
          onClose={this.closeDrawer}
          anchor="left"
          classes={{ paper: classes.paper }}
        >
          <div className="test">
            <Typography className={classes.users_header} variant="h6">
              Users
            </Typography>
              <Button  className={classes.add_user_btn} onClick = {() => this.handleAddUser(classes)}>
                <Typography variant="p">Add User</Typography>
              </Button>
          </div>
          <Divider className={classes.divider} />
          {this.state.add_user || users.map((user) => (
            <List>
              <Link to={`/user/${user.username}`} className={classes.user_link}>
                <ListItem button key={user.id} onClick={this.closeDrawer}>
                  <ListItemIcon>
                    <AccountCircleIcon style={{ fill: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      user.first_name[0].toUpperCase() +
                      user.first_name.slice(1)
                    }
                  />
                </ListItem>
              </Link>
            </List>
          )) }
          

        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(UsersDrawer2);
