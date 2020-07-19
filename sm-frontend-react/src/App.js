import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Day from "./components/Day";
import Week from "./components/Week";
import Times from "./components/Times";
import Sliders from "./components/Sliders";

class App extends Component {
  state = {
    img: "",
    active_users: [],
    inactive_users: [],
    current_user: {
      first_name: "jordan",
      last_name: "giles",
      username: "Trunks159",
      position: "manager",
      anonymous: false,
    },
    sliders: [],
  };

  async firstAsync() {
    const rawResponse = await fetch("/receive_data", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.sliders),
    });
    const content = await rawResponse.json();

    console.log(content);
  }

  componentDidMount() {
    fetch("/users").then((response) =>
      response.json().then((data) => {
        this.setState({ inactive_users: data.users });
      })
    );
  }

  saveChanges = (e) => {
    this.firstAsync();
  };

  weSliding = (e, new_value, id) => {
    let sliders = [...this.state.sliders];
    let i = 0;
    for (let slider of sliders) {
      if (id === slider.id) {
        sliders.splice(i, 1);
        this.setState({ sliders: [...sliders, { id: id, value: new_value }] });
        break;
      }
      i++;
    }
  };

  makeSlider = (e, user) => {
    let inactive_users = [...this.state.inactive_users];
    const index = this.state.inactive_users.indexOf(user);
    inactive_users.splice(index, 1);
    this.setState({ inactive_users: inactive_users });
    let active_users = [...this.state.active_users];
    active_users.push(user);
    this.setState((prevState) => ({
      sliders: [
        ...prevState.sliders,
        { id: user.id, value: ["8:00", "16:00"] },
      ],
    }));
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

  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <NavBar handler={this.makeSlider} users={this.state.inactive_users} />
          <Day />
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
          <Week
            week={[
              {
                weekday: "Tues.",
                date: "Nov 4",
              },
              {
                weekday: "Wed.",
                date: "Nov 5",
              },
              {
                weekday: "Thurs.",
                date: "Nov 6",
              },
              {
                weekday: "Fri.",
                date: "Nov 7",
              },
              {
                weekday: "Sat.",
                date: "Nov 8",
              },
              {
                weekday: "Sun.",
                date: "Nov 9",
              },
            ]}
          />
        </div>
      </div>
    );
  }
}

export default App;
