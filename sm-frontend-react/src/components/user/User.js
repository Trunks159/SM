import React, { Component } from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = () => {
  return null;
};

class User extends Component {
  state: {};

  render() {
    const { user, classes } = this.props;
    return (
      <React.Fragment>
        <Typography variant="h6">{user.username} Details</Typography>
        <Link to="/">
          <Typography variant="p">Edit Availability</Typography>
        </Link>
        <Link to="/">
          <Typography variant="p">Reqeust Off</Typography>
        </Link>
        <p>
          Full Name: {user.first_name} {user.last_name}
        </p>
        <p>Position: {user.position}</p>
        <h1>Upcoming Shifts</h1>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(User);
