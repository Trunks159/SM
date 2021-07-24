import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Drawer, Divider, IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import ReorderIcon from "@material-ui/icons/Reorder";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Alert, AlertTitle } from "@material-ui/lab";

const styles = () => ({
  lst: {
    overflowY: "auto",
  },
  list: {
    width: 250,
    margin: 0,
    background: "#C63AAB",
  },
  fullList: {
    width: "auto",
  },
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
    color: "white",
  },

  main_container: {
    background: "#C63AAB",
    width: "250px",
  },
  container1: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "40px",
    margin: "10px",
  },
  btn: {
    color: "white",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "white",
    },
    flex: 1,
    margin: "3px",
    borderRadius: 0,
  },

  container2: {
    color: "white",
    margin: "20px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    height: "60%",
    boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 0.25)",
  },
  add_user_header: {
    margin: "10px",
  },
  textfields: {
    color: "white",
    flex: "0 0 50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },

  textfield: {
    color: "white",
  },
  btnSubm: {
    textTransform: "none",
    color: "white",
    backgroundColor: "#E258C7",
    borderRadius: 3,
    margin: "20px",
    "&:hover": {
      backgroundColor: "#FF42DA",
    },
  },
  select: {
    display: "flex",
    flexDirection: "column",
  },
});

class UsersDrawer extends Component {
  state = {
    isDrawerOpened: false,
    add_user: false,
    first_name: "",
    last_name: "",
    position: "crew",
    checked: false,
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
    console.log("New value: ", e.target.name, e.target.value);
  };
  handleSelect = (e) => {
    console.log("Name: ", e.target.name, "Value: ", e.target.value);
  };

  handleUsersBtn = () => {
    this.setState({ add_user: false });
  };

  handlesubmitUser = (e) => {
    e.preventDefault();
    const { first_name, last_name, position } = this.state;
    const { users, notifyUser } = this.props;
    const u = users.find(
      (user) =>
        user.first_name.toLowerCase() === first_name.toLowerCase() &&
        user.last_name.toLowerCase() === last_name.toLowerCase()
    );

    if (u) {
      const message = (
        <Alert severity="error">
          <AlertTitle>Name Error</AlertTitle>
          User with that name already exists
        </Alert>
      );
      this.setState({
        errors: message,
      });
      setTimeout(() => {
        this.setState({ errors: null });
      }, 4000);
    } else {
      const { postReq } = this.props;
      let rawResponse = postReq("/add_user", {
        first_name: first_name.toLowerCase(),
        last_name: last_name.toLowerCase(),
        position: position.toLowerCase(),
      });
      notifyUser({
        content:
          first_name + " " + last_name + " has been successfully added!!",
        title: "Success",
        severity: "success",
      });

      rawResponse.then((data) =>
        data.json().then((response) => {
          console.log("I guess we are good", response);
        })
      );
    }
  };

  handleAddUser = () => {
    const { classes } = this.props;
    if (this.state.add_user === false) {
      this.setState({
        add_user: (
          <form className={classes.container2} onSubmit={this.handlesubmitUser}>
            <Typography variant="h6" className={classes.add_user_header}>
              Add User
            </Typography>
            <Divider></Divider>
            <div className={classes.textfields}>
              <TextField
                required
                className={classes.textfieldfn}
                name="first_name"
                label="Enter First Name"
                onChange={this.handleChange}
                variant="outlined"
                InputProps={{ className: classes.textfield }}
                InputLabelProps={{ className: classes.textfield }}
              />
              <TextField
                required
                className={classes.textfieldln}
                name="last_name"
                label="Enter Last Name"
                onChange={this.handleChange}
                variant="outlined"
                InputProps={{ className: classes.textfield }}
                InputLabelProps={{ className: classes.textfield }}
              />
            </div>
            <div className={classes.select}>
              <Typography className={classes.input} variant="body1">
                Position
              </Typography>
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

            <Button type="submit" className={classes.btnSubm}>
              Submit User
            </Button>
          </form>
        ),
      });
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
    const { users, classes, current_user } = this.props;
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
          classes={{ paper: classes.main_container }}
        >
          <div className={classes.container1}>
            <Button
              variant="contained"
              className={classes.btn}
              onClick={this.handleUsersBtn}
              style={
                this.state.add_user === false
                  ? { backgroundColor: "#C63AAB" }
                  : { backgroundColor: "#FF42DA" }
              }
            >
              Users
            </Button>
            {current_user.position === "manager" ? (
              <Button
                variant="contained"
                className={classes.btn}
                onClick={this.handleAddUser}
                style={
                  this.state.add_user
                    ? { backgroundColor: "#C63AAB" }
                    : { backgroundColor: "#FF42DA" }
                }
              >
                Add User
              </Button>
            ) : null}
          </div>
          <Divider />
          {this.state.errors}
          {/*<Divider className={classes.divider} />*/}
          {this.state.add_user || (
            <div className={classes.lst}>
              {users.map((user) => (
                <Link
                  to={`/user/${user.username}`}
                  className={classes.user_link}
                  key={user.id}
                >
                  <ListItem button key={user.id} onClick={this.closeDrawer}>
                    <ListItemIcon>
                      <AccountCircleIcon
                        style={
                          user.username ? { fill: "white" } : { fill: "grey" }
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
              ))}
            </div>
          )}
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(UsersDrawer);
