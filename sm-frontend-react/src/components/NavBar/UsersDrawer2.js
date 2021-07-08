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
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

const styles = () => ({
  list: {
    width: 250,
    margin: 0,
    background: "#7e266c",
  },
  fullList: {
    width: "auto",
  },
  divider: {},
  user_button: {
    width: "100%",
    backgroundColor: "#BE35A3",
    textTransform: "none",
    "&:hover": {
      background: "#FF4BDB",
    },
  },

  user_link: {
    textDecoration: "none",
  },
  users_header: {
    color: "white",
    textTransform: "none",
    backgroundColor: "#7e266c",
    "&:hover": {
      backgroundColor: "white",
    },
    margin: "20px",
    display: "block",
  },
  add_user_btn: {
    color: "white",
    textTransform: "none",
    background: "#FF4BDB",
    ":&hover": {
      background: "#FF9CEB",
    },
    textDecoration: "none",
  },
  paper: {
    background: "white",
    width: "250px",
  },
  textField: {},
  input: {},
  add_user_form: {
    margin: "20px",
    display: "flex",
    flexDirection: "column",
    height: "65%",
    justifyContent: "space-evenly",
  },
});

class UsersDrawer2 extends Component {
  state = {
    isDrawerOpened: false,
    add_user: false,
    first_name: "",
    last_name: "",
    position: "crew",
  };

  toggleDrawerStatus = () => {
    this.setState({
      isDrawerOpened: true,
    });
  };

  closeDrawer = () => {
    const original_state = {
      isDrawerOpened: false,
      add_user: false,
      first_name: "",
      last_name: "",
      position: "crew",
    };
    this.setState(original_state);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlesubmitUser = () => {
    const { first_name, last_name, position } = this.state;
    const { postReq } = this.props;
    let rawResponse = postReq("/add_user", {
      first_name: first_name.toLowerCase(),
      last_name: last_name.toLowerCase(),
      position: position.toLowerCase(),
    });
    rawResponse.then((data) =>
      data.json().then((response) => {
        console.log("I guess we are good", response);
      })
    );
  };

  handleAddUser = () => {
    const { classes } = this.props;
    if (this.state.add_user === false) {
      this.setState({
        add_user: (
          <div className={classes.add_user_form}>
            <Typography variant="h6" className={classes.input}>
              Add User
            </Typography>
            <TextField
              className={classes.textfield}
              name="first_name"
              label="Enter First Name"
              onChange={this.handleChange}
              variant="outlined"
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
            />
            <TextField
              className={classes.input}
              name="last_name"
              label="Enter Last Name"
              onChange={this.handleChange}
              variant="outlined"
              InputLabelProps={{ className: classes.input }}
            />
            <FormControl>
              <Typography className={classes.input} variant="h6">
                Position
              </Typography>
              <Select
                id="demo-simple-select"
                value={this.state.position}
                onChange={this.handleChange}
                inputProps={{ className: classes.input }}
              >
                <MenuItem value={"crew"}>Crew</MenuItem>
                <MenuItem value={"manager"}>Manager</MenuItem>
              </Select>
              <Button onClick={this.handlesubmitUser}>Submit User</Button>
            </FormControl>
          </div>
        ),
      });
    } else {
      this.setState({ add_user: false });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const original_state = {
        isDrawerOpened: false,
        add_user: false,
        first_name: "",
        last_name: "",
        position: "crew",
      };
      this.setState(original_state);
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
            <Button variant="contained" className={classes.users_header}>
              Users
            </Button>
            <Button
              className={classes.add_user_btn}
              onClick={this.handleAddUser}
            >
              Add User
            </Button>
          </div>
          <Divider className={classes.divider} />
          {this.state.add_user ||
            users.map((user) => (
              <List>
                <Link
                  to={`/user/${user.username}`}
                  className={classes.user_link}
                >
                  <ListItem button key={user.id} onClick={this.closeDrawer}>
                    <ListItemIcon>
                      <AccountCircleIcon
                        style={
                          user.username ? { fill: "black" } : { fill: "grey" }
                        }
                      />
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
            ))}
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(UsersDrawer2);
