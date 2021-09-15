import React, { Component } from "react";

import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

/*CONVERTS VALUE OUT OF 100 TO SECONDS*/
const f = (x) => {
  x = 0.01 * x;
  const range = [7, 23];
  const time_range = range[1] - range[0];
  let hours = time_range * x;
  console.log("What f returns: ", hours + range[0] * 3600);
  return (hours + range[0]) * 3600;
};

/*CONVERTS SECONDS TO STRING TIME */
const secondsToTime = (x) => {
  var sec_num = parseInt(x, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  console.log("Seconds to time returns: ", x);
  return hours + ":" + minutes;
};

/*CONVERTS SECONDS TO VALUE */
const timetoValue = (time) => {
  const time_range = [25200, 82800];
  const time_delta = time_range[1] - time_range[0];
  const x = time - time_range[0];
  return (x / time_delta) * 100;
};

function valuetext(value) {
  return `${value}°C`;
}

const marks = [];
for (let time = 25200; time <= 82800; time += 1800) {
  marks.push({
    value: timetoValue(time),
  });
}

class VerticalSlider extends Component {
  render() {
    const { removeSlider, workblock, weSliding } = this.props;
    const user = workblock.user;
    return (
      <div id="di" className="slider">
        <Typography id="range-slider" gutterBottom>
          <div className="inactive-user" id="active-user">
            <button onClick={() => removeSlider(user)}>
              <p>+</p>
            </button>
            <p className="label">
              {user.first_name[0].toUpperCase() + user.first_name.slice(1)}
            </p>
          </div>
        </Typography>
        <Slider
          valueLabel={{ color: user.color }}
          valueLabelDisplay="auto"
          valueLabelFormat={(x) => secondsToTime(f(x))}
          orientation="vertical"
          defaultValue={[
            timetoValue(workblock.start_time),
            timetoValue(workblock.end_time),
          ]}
          aria-labelledby="vertical-slider"
          getAriaValueText={valuetext}
          marks={marks}
          step={null}
          onChangeCommitted={(e, new_value) =>
            weSliding(
              e,
              new_value.map((value) => f(value)),
              user
            )
          }
        />
      </div>
    );
  }
}
export default VerticalSlider;
