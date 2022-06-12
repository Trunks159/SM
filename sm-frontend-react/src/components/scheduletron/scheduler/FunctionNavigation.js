import React, { Component } from "react";

class FNav extends Component {
  state = {};
  render() {
    return (
      <div>
        <svg  style = {{background : 'blue'}}>
          <circle
            cx="50"
            cy="50"
            r="9"
            fill="red"
          />
        </svg>
      </div>
    );
  }
}

export default FNav;
