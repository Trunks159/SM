import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Drawer, Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import { ReactComponent as UsersIcon } from "../../assets/images/Users Icon.svg";
import AddUserForm from "./UsersDrawer/AddUserForm";

const styles = () => ({
  iconButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& p": {
      fontSize: 12,
      margin: 3,
    },
  },
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
  userButton: {
    width: "100%",
    backgroundColor: "#BE35A3",
    textTransform: "none",
    "&:hover": {
      background: "#FF4BDB",
    },
  },
  userLink: {
    textDecoration: "none",
    color: "white",
  },

  mainContainer: {
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

});

class UsersDrawer extends Component {
  state = {
    isDrawerOpened: false,
    addUser: false,
    firstName: "",
    lastName: "",
    position: "crew",
    checked: false,
  };

  toggleDrawerStatus = () => {
    this.setState({
      isDrawerOpened: true,
    });
  };

  closeDrawer = () => {
    const originalState = {
      isDrawerOpened: false,
      addUser: false,
      firstName: "",
      lastName: "",
      position: "crew",
    };
    this.setState(originalState);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSelect = (e) => {
    console.log("Name: ", e.target.name, "Value: ", e.target.value);
  };

  handleUsersBtn = () => {
    this.setState({ addUser: false });
  };

  handlesubmitUser = (e) => {
    e.preventDefault();
    const { firstName, lastName, position } = this.state;
    const { users, notifyUser } = this.props;
    const u = users.find(
      (user) =>
        user.firstName.toLowerCase() === firstName.toLowerCase() &&
        user.lastName.toLowerCase() === lastName.toLowerCase()
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
        first_name: firstName.toLowerCase(),
        last_name: lastName.toLowerCase(),
        position: position.toLowerCase(),
      });
      /*This try catch doesn't really work */
      try {
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
      } catch (err) {
        notifyUser({
          content: "No Response From Server :(",
          title: "Error",
          severity: "error",
        });
      }
    }
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      const originalState = {
        isDrawerOpened: false,
        addUser: false,
        firstName: "",
        lastName: "",
        position: "crew",
      };
      this.setState(originalState);
    }
  };

  toggleAddUserForm = () => this.setState({ addUser: true });

  /* I literally copy and pasted this from stackoverflow
  looks like it sorts users based on name
 This is the function you would pass to .sort*/

  dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

  render() {
    const { isDrawerOpened } = this.state;
    let { classes, currentUser, colorPalette, users } = this.props;
    users = users.sort(this.dynamicSort("firstName"));
    console.log("Users: ", this.props.currentUser);
    return (
      <div>
        <div className={classes.iconButton}>
          <p style={{ color: colorPalette.blue }}>Users</p>
          <Button onClick={this.toggleDrawerStatus}>
            <UsersIcon />
          </Button>
        </div>
        <Drawer
          variant="temporary"
          open={isDrawerOpened}
          onClose={this.closeDrawer}
          anchor="left"
          classes={{ paper: classes.mainContainer }}
        >
          <div className={classes.container1}>
            <Button
              variant="contained"
              className={classes.btn}
              onClick={this.handleUsersBtn}
              style={
                this.state.addUser === false
                  ? { backgroundColor: "#C63AAB" }
                  : { backgroundColor: "#FF42DA" }
              }
            >
              Users
            </Button>
            {currentUser.position === "manager" ? (
              <Button
                variant="contained"
                className={classes.btn}
                onClick={this.toggleAddUserForm}
                style={
                  this.state.addUser
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
          {this.state.addUser ? (
            <AddUserForm users={users} />
          ) : this.props.users ? (
            <div className={classes.lst}>
              {users.map((user) => (
                <Link
                  to={`/user/${user.username}`}
                  className={classes.userLink}
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
                        user.firstName[0].toUpperCase() +
                        user.firstName.slice(1)
                      }
                    />
                  </ListItem>
                </Link>
              ))}
            </div>
          ) : null}
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(UsersDrawer);
