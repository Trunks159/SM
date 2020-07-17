import React, { Component } from "react";
import VerticleSlider from "./VerticleSlider";

class Sliders extends Component {
  render() {
    return (
      <div className="sliders">
        {this.props.users.map((user) => (
          <VerticleSlider handler={this.props.handler} user={user} />
        ))}
      </div>
    );
  }
}

export default Sliders;
