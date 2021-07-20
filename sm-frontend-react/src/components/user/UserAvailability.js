import React, { Component } from "react";
import { Button, Divider, Switch, Slider } from "@material-ui/core";
import { ThemeProvider, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Fade from "@material-ui/core/Fade";

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
  slider: {
    width: "70%",
    leftMargin: "10px",
    rightMargin: "10px",
  },
  avBlock: {
    margin: "20px",
    display: "flex",
    flexWrap: "wrap",
    borderRadius: "5px",
    alignItems: "center",
    justifyContent: "center",
    transition: "all .3s ease-in-out",
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
    monday: {
      name: "monday",
      checked: this.props.availability.monday ? true : false,
      value: this.props.availability
        ? this.props.convertAvailability(this.props.availability.monday)
        : [0, 50],
    },
    tuesday: {
      name: "tuesday",
      checked: this.props.availability.tuesday ? true : false,
      value: this.props.availability
        ? this.props.convertAvailability(this.props.availability.tuesday)
        : [0, 50],
    },
    wednesday: {
      name: "wednesday",
      checked: this.props.availability.wednesday ? true : false,
      value: this.props.availability
        ? this.props.convertAvailability(this.props.availability.wednesday)
        : [0, 50],
    },
    thursday: {
      name: "thursday",
      checked: this.props.availability.thursday ? true : false,
      value: this.props.availability
        ? this.props.convertAvailability(this.props.availability.thursday)
        : [0, 50],
    },
    friday: {
      name: "friday",
      checked: this.props.availability.friday ? true : false,
      value: this.props.availability
        ? this.props.convertAvailability(this.props.availability.friday)
        : [0, 50],
    },
    saturday: {
      name: "saturday",
      checked: this.props.availability.saturday ? true : false,
      value: this.props.availability
        ? this.props.convertAvailability(this.props.availability.saturday)
        : [0, 50],
    },
    sunday: {
      name: "sunday",
      checked: this.props.availability.sunday ? true : false,
      value: this.props.availability
        ? this.props.convertAvailability(this.props.availability.sunday)
        : [0, 50],
    },
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

  dtToMarks = () => {
    const y = this.timeCrap();
    const marks = y.map((time) => {
      if (time === y[0]) {
        return { value: (y.indexOf(time) / y.length) * 100, label: "7:00AM" };
      } else if (time === y[y.length - 1]) {
        return { value: (y.indexOf(time) / y.length) * 100, label: "11:30PM" };
      } else if (time.getHours() === 16 && time.getMinutes() === 0) {
        return { value: (y.indexOf(time) / y.length) * 100, label: "4:00PM" };
      }
      return { value: (y.indexOf(time) / y.length) * 100 };
    });
    return marks;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } =
      this.state;
    const { postReq, notifyUser, user } = this.props;
    let days = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
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

  timeCrap = () => {
    let t = new Date();
    t.setHours(0, 0, 0, 0);
    t.setHours(7);
    let x = [];
    while (t.getHours() <= 22) {
      x.push(new Date(t));
      t.setMinutes(t.getMinutes() + 30);
    }
    return x;
  };

  handleSwitch = (e) => {
    if (e.target.name === "monday") {
      this.setState({
        monday: {
          ...this.state.monday,
          checked: e.target.checked,
        },
      });
    } else if (e.target.name === "tuesday") {
      this.setState({
        tuesday: {
          ...this.state.tuesday,
          checked: e.target.checked,
        },
      });
    } else if (e.target.name === "wednesday") {
      this.setState({
        wednesday: {
          ...this.state.wednesday,
          checked: e.target.checked,
        },
      });
    } else if (e.target.name === "thursday") {
      this.setState({
        thursday: {
          ...this.state.thursday,
          checked: e.target.checked,
        },
      });
    } else if (e.target.name === "friday") {
      this.setState({
        friday: {
          ...this.state.friday,
          checked: e.target.checked,
        },
      });
    } else if (e.target.name === "saturday") {
      this.setState({
        saturday: {
          ...this.state.saturday,
          checked: e.target.checked,
        },
      });
    } else if (e.target.name === "sunday") {
      this.setState({
        sunday: {
          ...this.state.sunday,
          checked: e.target.checked,
        },
      });
    }
  };

  handleSlider = (e, new_value, day) => {
    if (day === "monday") {
      this.setState({
        monday: {
          ...this.state.monday,
          value: new_value,
        },
      });
    } else if (day === "tuesday") {
      this.setState({
        tuesday: {
          ...this.state.tuesday,
          value: new_value,
        },
      });
    } else if (day === "wednesday") {
      this.setState({
        wednesday: {
          ...this.state.wednesday,
          value: new_value,
        },
      });
    } else if (day === "thursday") {
      this.setState({
        thursday: {
          ...this.state.thursday,
          value: new_value,
        },
      });
    } else if (day === "friday") {
      this.setState({
        friday: {
          ...this.state.friday,
          value: new_value,
        },
      });
    } else if (day === "saturday") {
      this.setState({
        saturday: {
          ...this.state.saturday,
          value: new_value,
        },
      });
    } else if (day === "sunday") {
      this.setState({
        sunday: {
          ...this.state.sunday,
          value: new_value,
        },
      });
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
    const y = this.timeCrap();
    const marks = this.dtToMarks();
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
            <div
              className={classes.avBlock}
              style={
                this.state[day].checked
                  ? { border: "1px solid #00BBFF" }
                  : { border: "1px solid black" }
              }
            >
              <Typography>{day[0].toUpperCase() + day.slice(1)}</Typography>

              <Switch
                checked={this.state[day].checked}
                onChange={this.handleSwitch}
                name={day}
              />
              {this.state[day].checked ? (
                <Fade in={this.state[day].checked}>
                  <Slider
                    key={day}
                    defaultValue={this.state[day].value}
                    marks={marks}
                    valueLabelFormat={(value) => this.valueToTime(value)}
                    step={null}
                    className={classes.slider}
                    valueLabelDisplay="auto"
                    onChangeCommitted={(e, new_value) =>
                      this.handleSlider(e, new_value, day)
                    }
                  />
                </Fade>
              ) : null}
            </div>
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
