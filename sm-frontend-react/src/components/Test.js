import React from "react";
/*const c = 700;
const x = [1600, 2000];
const y = [700, 2300];
const z = [y[0] - c, y[1] - c];
const z2 = [x[0] - c, x[1] - c];
const j = z2[0]/z[1] //=.5625
const k = z2[1]/z[1] // =.8125
*/

const LineGenerator = () => "Hello World";

const Test = ({ users }) => (
  <div className="main">
    <svg height="1000" width="1000">
      <line id="line" x1="20" y1="562.5" x2="20" y2="812.5" />
    </svg>
    <h1
      id="h1"
      onClick={() => document.getElementById("line").setAttribute("y2", "1200")}
    >
      Hey Boys
    </h1>
  </div>
);

const f = (x) => {
  x = x * 0.01;
  const range = [7, 23];
  const time_range = range[1] - range[0];
  let hours = time_range * x;
  const time = range[0] + hours;
  if (time < 12) {
    hours = Math.floor(time);
    const new_time =
      hours.toString() + Math.round(60 * (time - hours)).toString() + "AM";
    return new_time;
  }
};

export default Test;
