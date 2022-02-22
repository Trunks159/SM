import React, { Component } from "react";
import HealthBar from "../HealthBar";
import { withStyles } from "@material-ui/styles";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

const styles = () => ({
  userInitial: {
    background: "red",
  },
});

class ProfileInfo extends Component {
  state = {
    loading: true,
  };
  componentDidMount = () => {
    fetch(`/profile_info/${this.props.id}/${this.props.weekday}`)
      .then((response) => response.json())
      .then(({ firstName, lastName, availability, shifts }) => {
        this.setState({
          firstName: firstName,
          lastName: lastName,
          availability: availability,
          shifts: shifts,
          loading: false,
        });
      });
  };
  render() {
    const { classes } = this.props;
    if (this.state.loading) {
      return <p>Loading</p>;
    } else {
      const { firstName, lastName, availability, shifts } = this.state;
      return (
        <div>
          <p className={classes.userInitial}>{firstName.charAt(0)}</p>
          <p>
            {firstName} {lastName}
          </p>
          <HealthBar shiftHealth={0.5} />
          <p>Availability : </p>
          {availability}
        </div>
      );
    }
  }
}

export default withStyles(styles)(ProfileInfo);
