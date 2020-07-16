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
    users: [
      {
        first_name: "jordan",
        last_name: "giles",
        username: "Trunks159",
        position: "manager",
        color: "#00FFFF",
        anonymous: false,
        id: 1,
      },
      {
        first_name: "eric",
        last_name: "brown",
        username: "ebrown",
        position: "",
        color: "#FFA500",
        anonymous: false,
        id: 2,
      },
      {
        first_name: "william",
        last_name: "mcaden",
        username: "wmcaden",
        color: "#FF6347",
        position: "",
        anonymous: false,
        id: 3,
      },
      {
        first_name: "abeil",
        last_name: "adilo",
        username: "aadilo",
        color: "#FF6347",
        position: "",
        anonymous: false,
        id: 4,
      },
      {
        first_name: "josh",
        last_name: "cress",
        username: "jcress",
        color: "#FF6347",
        position: "",
        anonymous: false,
        id: 5,
      },
    ],
    current_user: {
      first_name: "jordan",
      last_name: "giles",
      username: "Trunks159",
      position: "manager",
      anonymous: false,
    },
  };
  componentDidMount() {
    fetch("/users").then((response) =>
      response.json().then((data) => {
        this.setState({ users: data.users });
      })
    );
  }

  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <NavBar users={this.state.users} />
          <Day />
          <div className="box-3">
            <Times />
            <Sliders users={this.state.users} />
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
