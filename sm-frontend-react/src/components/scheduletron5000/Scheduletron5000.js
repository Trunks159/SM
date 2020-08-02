import React, { Component } from "react";
import Sliders from "./Sliders";
import Times from "./Times";

class Scheduletron5000 extends Component {
  state = {
    active_users: [],
  };

  weSliding = (e, new_value, user) => {
    let users = [...this.state.active_users];
    const index = users.indexOf(user);
    users.splice(index, 1);
    user.value = new_value;
    users.splice(index, 0, user);
    this.setState({ active_users: users });
  };

  removeSlider = (user) => {
    let active_users = [...this.state.active_users];
    const index = this.state.active_users.indexOf(user);
    active_users.splice(index, 1);
    this.setState({ active_users: active_users });
    let inactive_users = [...this.state.inactive_users];
    inactive_users.push(user);
    this.setState({ inactive_users: inactive_users });
  };

  async saveChanges() {
    this.setState({
      message: "This day's schedule has been saved!",
    });
    setTimeout(() => {
      this.setState({ message: null });
    }, 1600);

    const values = this.state.active_users.map((user) => ({
      id: user.id,
      value: user.value,
    }));
    const rawResponse = await fetch("/receive_data", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date: this.state.date, values: values }),
    });
    const content = await rawResponse.json();
    console.log(content);
  }

  render() {
    return (
      <div className="wrapper">
        <div className="box-3">
          <Times />
          <Sliders
            handler={this.removeSlider}
            users={this.state.active_users}
            weSliding={this.weSliding}
          />
          <button className="btn" onClick={this.saveChanges}>
            Save Changes
          </button>
        </div>
      </div>
    );
  }
}

export default Scheduletron5000;
