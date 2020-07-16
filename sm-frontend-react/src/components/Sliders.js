import React, { Component } from "react";
import VerticleSlider from "./VerticleSlider";

class Sliders extends Component {
  state = {
    users: this.props.users,
  };
  handleClick = (user) => {
    let users = this.state.users;
    const index = users.indexOf(user);
    users.splice(index, 1);
    this.setState({ users: users });
  };
  render() {
    return (
      <div className="sliders">
        {this.state.users.map((user) => (
          <VerticleSlider handler={this.handleClick} user={user} />
        ))}
      </div>
    );
  }
}

export default Sliders;
