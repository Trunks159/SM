import React, { Component } from "react";
import Sliders from "./Sliders";
import Times from "./Times";

class Scheduletron5000 extends Component {
  state = {
    active_users: [],
    inactive_users: [],
    current_day: {},
    redirect: false,
  };

  weSliding = (e, new_value, user) => {
    let users = [...this.state.active_users];
    const index = users.indexOf(user);
    users.splice(index, 1);
    user.value = new_value;
    users.splice(index, 0, user);
    this.setState({ active_users: users });
  };

  makeSlider = (user) => {
    let inactive_users = [...this.state.inactive_users];
    const index = this.state.inactive_users.indexOf(user);
    inactive_users.splice(index, 1);
    this.setState({ inactive_users: inactive_users });
    let active_users = [...this.state.active_users];
    active_users.push(user);
    this.setState({ active_users: active_users });
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

  componentDidMount() {
    fetch("/users").then((response) =>
      response.json().then((data) => {
        let users = data.users.map((user) => {
          user["value"] = ["08:00", "16:00"];
          return user;
        });
        if (data.current_user.is_authenticated === false) {
          this.setState({ redirect: true });
          console.log("Gotta Be Logged in My guy");
        } else {
          this.setState({
            inactive_users: users,
          });
        }
      })
    );
    this.checkDb(this.props.date);
    this.props.changeCurrentDay(this.state.day);

    /*
    console.log("props: ", this.props);
    if (this.props.date) {
      console.log("Found users!", this.props.users);
      this.setState({
        current_day: this.props.findDay(this.props.date),
        inactive_users: this.props.users,
      });
    } else {
      console.log("No users yet");
    }*/
  }

  checkDb = async (date) => {
    console.log("The day that is sent:", date);
    const rawResponse = await fetch("/create_day", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date: date }),
    });
    const content = await rawResponse.json();
    this.setState({ day: content.day });
  };

  render() {
    return (
      <div className="scheduletron">
        <div className="timesliders">
          <Times />

          <Sliders
            handler={this.removeSlider}
            users={this.state.active_users}
            weSliding={this.weSliding}
          />
        </div>
        {this.state.inactive_users.length > 0
          ? this.state.inactive_users.map((user) => (
              <button
                className="inactive-user"
                key={user.id}
                onClick={() => this.makeSlider(user)}
              >
                {user.first_name} {user.last_name[0]}.
              </button>
            ))
          : null}
        <button className="btn" onClick={this.saveChanges}>
          Save Changes
        </button>
      </div>
    );
  }
}

export default Scheduletron5000;
