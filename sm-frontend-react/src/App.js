import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
//import Users from "./components/Users";
//import Registration from "./components/Registration";
//import MyBarChart from "./components/MyBarChart2";
//import Test from "./components/Test";

import VerticleSlider from "./components/VerticleSlider";
//import data from "./range-data.json";

class App extends Component {
  state = {
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
    fetch("/schedule").then((response) =>
      response.json().then((data) => {
        this.setState({ users: data.users });
      })
    );
  }
  render() {
    return (
      <div className="App">
        <NavBar current_user={this.state.current_user} />
        <div className="float-container">
          <div className="float-child1">
            <ul className="list">
              {[
                "7:00AM",
                "8:00AM",
                "9:00AM",
                "10:00AM",
                "11:00AM",
                "12:00PM",
                "1:00PM",
                "2:00PM",
                "3:00PM",
                "4:00PM",
                "5:00PM",
                "6:00PM",
                "7:00PM",
                "8:00PM",
                "9:00PM",
                "10:00PM",
                "11:00PM",
              ]
                .slice(0)
                .reverse()
                .map((x) => (
                  <li className="item">{x}</li>
                ))}
            </ul>
          </div>
          <div float="left" className="float-child2">
            <VerticleSlider name="Jordan" />
            <VerticleSlider name="Nova" />
            <VerticleSlider name="Elsa" />
            <VerticleSlider name="Jeff" />
            <VerticleSlider name="Joe" />
            <VerticleSlider name="Ryan" />
            <VerticleSlider name="Sarah" />
            <VerticleSlider name="Alphonso" />
            <VerticleSlider name="Bob" />
          </div>
        </div>
        {/*<Test users={this.state.users} />*/}
        {/*<MyBarChart data={data} />*/}
        {/*<Registration />*/}
      </div>
    );
  }
}

export default App;
