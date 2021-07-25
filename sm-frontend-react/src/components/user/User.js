import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Button, Divider } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import AvailabilityForm from "./UserAvailability";

const styles = () => ({
  main: {
    display: "flex",
    flexDirection: "column",
    margin: "30px",
    width: "330px",
  },
  header: {
    fontSize: 20,
    margin: "20px",
    marginTop: 0,
  },
  btnMain: {
    backgroundColor: "red",
    width: "50px",
    alignSelf: "center",
    marginTop: "auto",
  },
  textfield: {
    margin: "10px",
    width: "50%",
  },
  link: {
    alignSelf: "flex-end",
    display: "flex",
    textDecoration: "none",
    color: "#00BBFF",
    margin: "10px",
    fontSize: 20,
    alignItems: "center",
  },
  divider: {
    backgroundColor: "#00BBFF",
    width: "80%",
  },
  upcomingDiv: {
    border: "1px solid gray",
    borderRadius: "5px",
  },
  upcomingDivMain: {
    marginTop: "20px",
    marginBottom: "20px",
  },
});

class User extends Component {
  state = {
    first_name: "",
    last_name: "",
    position: "",
    upcomingShifts: null,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log("New value: ", e.target.name, e.target.value);
  };

  render() {
    const { user, classes, current_user } = this.props;
    return current_user.position === "manager" ||
      current_user.username === user.username ? (
      <form className={classes.main}>
        <Typography className={classes.header} variant="h6">
          {user.username}
          <br /> Details
        </Typography>
        <Divider className={classes.divider} />
        <Link
          className={classes.link}
          to={`/user/${user.username}/availability`}
        >
          <Typography variant="body1">Edit Availability</Typography>
          <ArrowRightAltIcon />
        </Link>
        <Link className={classes.link} to="/">
          <Typography variant="body1">Request Off</Typography>
          <ArrowRightAltIcon />
        </Link>
        <TextField
          required
          className={classes.textfield}
          value={user.first_name}
          name="first_name"
          label="Edit First Name"
          onChange={this.handleChange}
          variant="standard"
        />
        <TextField
          required
          className={classes.textfield}
          value={user.last_name}
          name="last_name"
          label="Edit Last Name"
          onChange={this.handleChange}
          variant="standard"
        />

        <Typography variant="body">
          Position: {user.position[0].toUpperCase() + user.position.slice(1)}
        </Typography>
        <div className={classes.upcomingDivMain}>
          <Typography variant="h6"> Upcoming Shifts</Typography>
          <div className={classes.upcomingDiv}>
            {this.state.upcomingShifts ? (
              this.state.upcomingShifts
            ) : (
              <Typography variant="body">No Shifts Coming Up</Typography>
            )}
          </div>
        </div>

        <Button type="submit" className={classes.btnMain}>
          Save
        </Button>
      </form>
    ) : (
      <div className={classes.main}>
        <Typography variant="h6">
          {user.username}
          <br /> Details
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(User);
