import React, { Component } from "react";
import {
  Button,
  Divider,
  Slider,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CustomSlider from "./CustomSlider";
import { valueToDt, timesToValues, miliToReg, getMarks } from "./TimeFunctions";
import { Alert, AlertTitle } from "@material-ui/lab";

const weekdays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]

const styles = () => ({
  stuff: {},
  header: {
    fontSize: 20,
    margin: "20px",
    marginTop: 0,
  },
  divider: {
    backgroundColor: "#00BBFF",
    width: "80%",
  },
  mainContent: {
    margin: "20px",
    display: "flex",
    flexDirection: "column",
  },

  submitBtn: {
    textTransform: "none",
    backgroundColor: "orange",
    width: "50%",
    alignSelf: "center",
    color: "white",
  },
});

class AvailabilityForm extends Component {
  state = {
    days: weekdays.map((day) => {
      return {
        name: day,
        value: timesToValues(
          this.props.user.availability
            ? this.props.user.availability[day]
            : null
        ),
        checked: this.props.user.availability
          ? !!this.props.user.availability[day]
          : null,
      };
    }),
    snackbar: {
      open: false,
    },
  };

  handleSwitch = (e) => {
    const { days } = this.state;
    const day = days.find((d) => d.name === e.target.name);

    if (day) {
      const index = days.indexOf(day);
      days.splice(index, 1);
      day.checked = e.target.checked;
      days.splice(index, 0, day);
      this.setState({ days: days });
    } else {
      console.log("Cant find it");
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('This is state rn: ', this.state);
    let { days } = this.state;
    const { postReq, user } = this.props;
   /* days = days.filter((item) => item.checked);*/

    if (days) {
      days = days.map((day) => {
        return {
          ...day,
          value: day.value.map((t) => {
            const x = valueToDt(t);
            return x.toTimeString().slice(0, 5);
          }),
        };
      });
      let req = postReq("/edit_availability", {
        days: days,
        username: user.username,
      });
      this.setState({ snackbar: { open: true } });
    }
  };

  handleSlider = (e, new_value, name) => {
    console.log('Day Name: ', name, ' New Value: ', new_value);
    let { days } = this.state;
    let day = this.state.days[name];

    if (day) {
      const index = days.indexOf(day);
      days.splice(index, 1);
      day.value = new_value;
      days.splice(index, 0, day);
      this.setState({ days: days });
    } else {
      console.log("Cant find it");
    }
  };

  render() {
    const { classes, user } = this.props;
    console.log('User Availability: ', this.props.user.availability);
    
    return (
      <form onSubmit={this.handleSubmit} className={classes.mainContent}>
        <Typography className={classes.header} variant="h6">
          {user.first_name[0].toUpperCase() + user.first_name.slice(1)}{" "}
          {user.last_name[0].toUpperCase() + user.last_name.slice(1)} AKA '
          {user.username}'
          <br /> Availability
        </Typography>
        <Typography variant="h6">Preferences</Typography>
        <Typography>Weekdays</Typography>
        <Slider
          defaultValue={50}
          steps={null}
          marks={[
            { value: 0, label: "Please No..." },
            { value: 50, label: "Don't Care" },
            { value: 100, label: "Yeah BOI" },
          ]}
        />
        <Typography>Weekends</Typography>
        <Typography>Short Shifts</Typography>
        <Typography>Mornings</Typography>
        <Typography>Nights</Typography>

        <Divider className={classes.divider} />
        {weekdays.map((day) => {
          const d = this.state.days.find((x) => x.name === day);
          return (
            <CustomSlider
              name={day}
              handleSwitch={this.handleSwitch}
              handleSlider={this.handleSlider}
              checked={d.checked}
              value={d.value}
              marks={getMarks()}
              key={user.id}
            />
          );
        })}

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.snackbar.open}
          onClose={() => this.setState({ snackbar: { open: false } })}
          autoHideDuration={2000}
        >
          <Alert
            onClose={() => this.setState({ snackbar: { open: false } })}
            severity="success"
          >
            Changes Saved!
          </Alert>
        </Snackbar>
        <Button type="submit" variant="contained" className={classes.submitBtn}>
          Save
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(AvailabilityForm);
