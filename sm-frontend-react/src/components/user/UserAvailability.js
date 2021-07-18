import React, { Component } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Button, Divider } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";

const styles = () => ({
  stuff: {},
});

class AvailabilityForm extends Component {
  state = {
    monday: {
      checked: false,
      value1: 0,
    },
    tuesday: {
      checked: false,
      value1: 0,
    },
    wednesday: {
      checked: false,
      value1: 0,
    },
    thursday: {
      checked: false,
      value1: 0,
    },
    friday: {
      checked: false,
      value1: 0,
    },
    saturday: {
      checked: false,
      value1: 0,
    },
    sunday: {
      checked: false,
      value1: 0,
    },
  };
  handleSubmit = (e) => {
    e.preventDefault();
  };

  handleChange = (e) => {
    this.setState({
      monday: {
        checked: e.target.checked,
        value: 0,
      },
    });
  };

  handleChange2 = (e, new_value) => {
    console.log("NewValue");
  };
  render() {
    const { classes } = this.props;
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
      <form onSubmit={this.handleSubmit}>
        {weekdays.map((day) => {
          return (
            <div>
              <Typography>{day}</Typography>
              <Switch
                checked={this.state[day].checked}
                onChange={this.handleChange}
              />
              {this.state[day].checked ? (
                <Slider
                  className={classes[day]}
                  onChangeCommitted={(e, new_value) =>
                    this.handleChange2(e, new_value)
                  }
                />
              ) : (
                <Slider disabled className={classes[day]} />
              )}
            </div>
          );
        })}

        <Button type="submit">Save</Button>
      </form>
    );
  }
}

export default withStyles(styles)(AvailabilityForm);
