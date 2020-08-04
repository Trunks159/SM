import React, { Component } from "react";

import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const f = (x) => {
  x = x * 0.01;
  const range = [7, 23];
  const time_range = range[1] - range[0];
  let hours = time_range * x;
  console.log("What f returns: ", hours + range[0]);
  return hours + range[0];
};

const y = (x) => {
  var sec_num = parseInt(x, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return hours + ":" + minutes;
};

const timetoValue = (time) => {
  const time_range = [700, 2300];
  const time_delta = time_range[1] - time_range[0];
  const x = time - time_range[0];
  return (x / time_delta) * 100;
};

const valueToTime = (value) => y(f(value) * 3600);

function valuetext(value) {
  return `${value}°C`;
}

const marks = [];
for (let time = 700; time <= 2300; time += 50) {
  marks.push({
    value: timetoValue(time),
  });
}

class VerticalSlider extends Component {
  state = { value: null };

  /*handleChange = (event, new_values, id) => {
     this.setState({ value: new_values.map((v) => valueToTime(v)) });
    console.log(new_values.map((v) => valueToTime(v)));
    console.log(new_values);
  };*/

  getValue = () => this.state.value;
  render() {
    const { handler, user, weSliding } = this.props;
    return (
      <div id="di" className="slider">
        <Typography id="range-slider" gutterBottom>
          <button className="btn" onClick={() => handler(user)}>
            {user.first_name[0].toUpperCase() + user.first_name.slice(1)}
          </button>
        </Typography>
        <Slider
          valueLabel={{ color: user.color }}
          valueLabelDisplay="auto"
          valueLabelFormat={(x) => valueToTime(x)}
          orientation="vertical"
          defaultValue={[timetoValue(800), timetoValue(1600)]}
          aria-labelledby="vertical-slider"
          getAriaValueText={valuetext}
          marks={marks}
          step={null}
          onChangeCommitted={(e, new_value) =>
            weSliding(
              e,
              new_value.map((value) => valueToTime(value)),
              user
            )
          }
        />
      </div>
    );
  }
}
export default VerticalSlider;