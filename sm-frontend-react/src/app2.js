import React, { Component } from "react";
import "./App.css";
import Sliders from "./components/Sliders";
import Times from "./components/Times";
import Week from "./components/Week";
import Workers from "./components/Workers";
//import data from "./range-data.json";

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
    fetch("/logo").then((response) =>
      response.json().then((data) => {
        this.setState({ img: data.img });
        console.log(this.state.img);
      })
    );
  }
  render() {
    return (
      <div className="App">
        <div className="float-container">
          <Workers workers={this.state.users} />

          {/*
          <Week
            week={[
              {
                weekday: "Mon.",
                date: "Nov 3",
              },
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
          <div className="container-2">
            <Times />
            <Sliders />
          </div>
          */}
        </div>
        {/*<Test users={this.state.users} />*/}
        {/*<MyBarChart data={data} />*/}
        {/*<Registration />*/}
      </div>
    );
  }
}

export default App;
