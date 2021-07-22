import React, { Component } from "react";
import { Button, Divider, Slider } from "@material-ui/core";
import { ThemeProvider, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import CustomSlider from "./CustomSlider";

const muiTheme = getMuiTheme({
  slider: {
    trackColor: "orange",
    selectionColor: "blue",
  },
});

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
    days: [
      [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ].map((day) => {
        return {
          name: day,
          value: [0, 50],
          checked: false,
        };
      }),
    ],
  };

  handleSwitch = (e) => {
    this.setState({ checked: e.target.value });
  };

  valueToTime = (value) => {
    console.log("Value...: ", value);
    const marks = this.dtToMarks();
    const x = this.timeCrap();
    console.log("MARKS: ", marks);
    const t = x[marks.indexOf(marks.find((t) => t.value === value))];
    return t.toTimeString().slice(0, 5);
  };

  valueToDt = (value) => {
    const marks = this.dtToMarks();
    const x = this.timeCrap();
    const t = x[marks.indexOf(marks.find((t) => t.value === value))];
    return [t.getHours(), t.getMinutes()];
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { days } = this.state;
    const { postReq, notifyUser, user } = this.props;
    days = days.filter((item) => item.checked);

    if (days) {
      days = days.map((day) => {
        return {
          ...day,
          value: day.value.map((t) => this.valueToTime(t)),
        };
      });
      let req = postReq("/edit_availability", {
        days: days,
        username: user.username,
      });
    }
  };

  handleSlider = (e, new_value, name) => {
    const { days } = this.state.days;
    const day = this.state.days.find((d) => d.name === name);

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
    const weekdays = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
    return (
      <form onSubmit={this.handleSubmit} className={classes.mainContent}>
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
        <Typography className={classes.header} variant="h6">
          {user.username}
          <br /> Availability
        </Typography>
        <Divider className={classes.divider} />
        {weekdays.map((day) => {
          return (
            <CustomSlider
              name={day}
              valueToTime={this.valueToTime}
              handleSwitch={this.handleSwitch}
              handleSlider={this.handleSlider}
              checked={false}
              value={[0, 50]}
            />
          );
        })}

        <Button type="submit" variant="contained" className={classes.submitBtn}>
          Save
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(AvailabilityForm);
