import React, { Component } from "react";
import clsx from "clsx";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import DehazeIcon from "@material-ui/icons/Dehaze";
import Typography from "@material-ui/core/Typography";

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
    background: "#CACACA",
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
    display: "block",
    textDecoration: "none",
    margin: "5px",
  },
  users: {
    "margin-left": "10px",
    color: "white",
  },
});

class UsersDrawer2 extends Component {
  state = {
    isDrawerOpened: false,
  };

  toggleDrawerStatus = () => {
    this.setState({
      isDrawerOpened: true,
    });
  };

  closeDrawer = () => {
    this.setState({
      isDrawerOpened: false,
    });
  };
  render() {
    const { isDrawerOpened } = this.state;
    const { users } = this.props;
    return (
      <div>
        <Drawer
          variant="temporary"
          open={isDrawerOpened}
          onClose={this.closeDrawer}
        >
          <Link to="/">Users</Link>
          {users.map((user) => (
            <h1>user.first_name</h1>
          ))}
        </Drawer>
      </div>
    );
  }
}

export default UsersDrawer2;
